import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { BssClient } from './clients/bss-soap-or-rest.client';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [SalesModule],
  controllers: [SyncController],
  providers: [SyncService, BssClient],
  exports: [SyncService],
})
export class SyncModule {}