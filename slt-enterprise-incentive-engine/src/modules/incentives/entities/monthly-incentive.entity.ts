import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('monthly_incentives')
export class MonthlyIncentive {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  period: string; // Format: 'YYYY-MM'

  @Column('uuid')
  sectionId: string;

  @Column('decimal', { precision: 12, scale: 2 })
  totalQualifiedRevenue: number;

  @Column('decimal', { precision: 12, scale: 2 })
  calculatedPayoutPool: number;

  @Column({ default: 'PROCESSED' })
  status: string; // PROCESSED, APPROVED, PAID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}