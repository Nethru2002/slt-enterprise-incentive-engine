import { Injectable, Logger } from '@nestjs/common';
import { SalesService } from './sales/sales.service';

@Injectable()
export class IncentiveCalculationService {
  private readonly logger = new Logger(IncentiveCalculationService.name);

  constructor(private readonly salesService: SalesService) {}

  async runMonthlyIncentiveEngine(month: string): Promise<any> {
    this.logger.log(`Executing batch monthly incentive calculation for period: ${month}`);
    const verifiedSales = await this.salesService.getFullyApprovedSales();
    
    // Processing calculation strictly from L1/L2 verified clearances
    const totalQualifiedRevenue = verifiedSales.reduce((acc, curr) => acc + Number(curr.totalAmount), 0);
    const calculatedPayoutPool = totalQualifiedRevenue * 0.045; // 4.5% distribution factor

    return {
      period: month,
      qualifiedSalesCount: verifiedSales.length,
      totalQualifiedRevenue,
      calculatedPayoutPool,
    };
  }
}