import { Injectable } from '@nestjs/common';
import { SalesApproval } from '../../sales/entities/sales-approval.entity';

@Injectable()
export class CommissionFormulaCalculator {
  calculateSectionIncentive(approvedSales: SalesApproval[], tierMultiplier: number = 0.05): number {
    const totalVolume = approvedSales.reduce((acc, sale) => acc + Number(sale.totalAmount), 0);
    return totalVolume * tierMultiplier;
  }
}