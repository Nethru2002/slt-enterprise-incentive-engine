import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sales_approvals')
export class SalesApproval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderReference: string;

  @Column('decimal', { precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ default: false })
  l1Approved: boolean;

  @Column({ default: false })
  l2Approved: boolean;

  @Column({ default: 'PENDING' })
  status: string; // PENDING, L1_APPROVED, COMPLETED, REJECTED

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}