import { Controller, Post, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('sync')
@UseGuards(JwtAuthGuard)
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('trigger')
  async manualSyncTrigger() {
    const correlationId = `manual-${Date.now()}`;
    await this.syncService.synchronizeCorporateData(correlationId);
    return { status: 'SYNC_TRIGGERED_SUCCESSFULLY', correlationId };
  }
}