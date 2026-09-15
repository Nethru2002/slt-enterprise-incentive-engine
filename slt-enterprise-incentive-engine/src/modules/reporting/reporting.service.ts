import { Injectable } from '@nestjs/common';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class ReportingService {
  constructor(private readonly salesService: SalesService) {}

  async generateMonthlyPerformanceReport(month: string) {
    const approvedSales = await this.salesService.getFullyApprovedSales();
    const aggregateVolume = approvedSales.reduce((sum, item) => sum + Number(item.totalAmount), 0);

    return {
      reportMonth: month,
      totalVerifiedSalesCount: approvedSales.length,
      aggregateApprovedVolume: aggregateVolume,
      generatedAt: new Date().toISOString(),
    };
  }
}