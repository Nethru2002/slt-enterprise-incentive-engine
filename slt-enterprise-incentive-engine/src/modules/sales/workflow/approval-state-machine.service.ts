import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesApproval } from '../entities/sales-approval.entity';

@Injectable()
export class ApprovalStateMachineService {
  constructor(
    @InjectRepository(SalesApproval)
    private readonly salesApprovalRepo: Repository<SalesApproval>,
  ) {}

  async transition(saleId: string, action: 'APPROVE_L1' | 'APPROVE_L2' | 'REJECT'): Promise<SalesApproval> {
    const sale = await this.salesApprovalRepo.findOne({ where: { id: saleId } });
    if (!sale) throw new NotFoundException('Sales record not found.');

    switch (action) {
      case 'APPROVE_L1':
        if (sale.status !== 'PENDING') throw new BadRequestException('Invalid state transition for L1.');
        sale.l1Approved = true;
        sale.status = 'L1_APPROVED';
        break;

      case 'APPROVE_L2':
        if (!sale.l1Approved || sale.status !== 'L1_APPROVED') {
          throw new BadRequestException('Cannot run L2 approval before successful L1 clearance.');
        }
        sale.l2Approved = true;
        sale.status = 'COMPLETED';
        break;

      case 'REJECT':
        sale.status = 'REJECTED';
        break;

      default:
        throw new BadRequestException('Unknown state action.');
    }

    return this.salesApprovalRepo.save(sale);
  }
}