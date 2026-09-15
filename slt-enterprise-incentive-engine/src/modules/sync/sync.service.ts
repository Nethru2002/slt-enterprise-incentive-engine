import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BssClient } from './clients/bss-soap-or-rest.client';
import { SalesApproval } from '../sales/entities/sales-approval.entity';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private readonly bssClient: BssClient,
    private readonly dataSource: DataSource,
  ) {}

  async synchronizeCorporateData(correlationId: string): Promise<void> {
    this.logger.log(`[${correlationId}] Fetching external BSS batch data...`);
    const records = await this.bssClient.fetchExternalBssRecords();

    // Create an isolated query runner for ACID transaction control
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const record of records) {
        // Check if order reference already exists
        const existing = await queryRunner.manager.findOne(SalesApproval, {
          where: { orderReference: record.orderReference },
        });

        if (!existing) {
          const newSale = queryRunner.manager.create(SalesApproval, {
            orderReference: record.orderReference,
            totalAmount: record.totalAmount,
            status: 'PENDING',
          });
          await queryRunner.manager.save(newSale);
        }
      }

      // Commit transaction if all inserts succeed
      await queryRunner.commitTransaction();
      this.logger.log(`[${correlationId}] BSS batch sync committed successfully via ACID transaction.`);
    } catch (err: unknown) {
      // Rollback completely if any error happens mid-stream
      await queryRunner.rollbackTransaction();
      const error = err as Error;
      this.logger.error(`[${correlationId}] BSS sync failed. Rolled back transaction: ${error.message}`);
      throw error;
    } finally {
      // Release query runner connection safely
      await queryRunner.release();
    }
  }
}