import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('reporting')
@UseGuards(JwtAuthGuard)
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('performance/:month')
  getPerformance(@Param('month') month: string) {
    return this.reportingService.generateMonthlyPerformanceReport(month);
  }
}