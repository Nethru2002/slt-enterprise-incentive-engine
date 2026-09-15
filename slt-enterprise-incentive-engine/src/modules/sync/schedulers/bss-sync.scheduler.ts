import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SyncService } from '../sync.service';

@Injectable()
export class BssSyncScheduler {
  private readonly logger = new Logger(BssSyncScheduler.name);

  constructor(private readonly syncService: SyncService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleBssDataSync() {
    const correlationId = `cron-${Date.now()}`;
    this.logger.log(`[${correlationId}] Starting automated BSS sync job...`);
    try {
      await this.syncService.synchronizeCorporateData(correlationId);
      this.logger.log(`[${correlationId}] BSS sync completed successfully.`);
    } catch (err: unknown) {
      const error = err as Error; // Type assertion to handle 'unknown' safely
      this.logger.error(`[${correlationId}] BSS sync failed: ${error.message}`, error.stack);
    }
  }
}