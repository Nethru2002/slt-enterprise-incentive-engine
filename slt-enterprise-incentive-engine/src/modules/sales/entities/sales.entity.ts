import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sales')
export class Sales {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  orderReference: string;

  @Column('decimal', { precision: 12, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}