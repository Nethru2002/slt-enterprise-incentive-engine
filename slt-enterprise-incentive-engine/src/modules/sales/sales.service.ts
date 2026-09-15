import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesApproval } from './entities/sales-approval.entity';
import { SubmitSalesDto } from './dto/submit-sales.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesApproval)
    private readonly salesApprovalRepo: Repository<SalesApproval>,
  ) {}

  async submitSale(dto: SubmitSalesDto): Promise<SalesApproval> {
    const saleApproval = this.salesApprovalRepo.create({
      ...dto,
      status: 'PENDING',
    });
    return this.salesApprovalRepo.save(saleApproval);
  }

  async processApproval(id: number | string, stage: 'L1' | 'L2'): Promise<SalesApproval> {
    const sale = await this.salesApprovalRepo.findOne({ where: { id: String(id) } });
    if (!sale) throw new NotFoundException('Sales record not found.');

    if (stage === 'L1') {
      sale.l1Approved = true;
      sale.status = 'L1_APPROVED';
    } else if (stage === 'L2') {
      if (!sale.l1Approved) {
        throw new BadRequestException('L2 approval cannot proceed before L1 clearance.');
      }
      sale.l2Approved = true;
      sale.status = 'COMPLETED';
    }

    return this.salesApprovalRepo.save(sale);
  }

  async getFullyApprovedSales(): Promise<SalesApproval[]> {
    return this.salesApprovalRepo.find({ where: { l1Approved: true, l2Approved: true } });
  }
}