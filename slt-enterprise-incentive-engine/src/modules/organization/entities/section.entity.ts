import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Division } from './division.entity';
import { SectionMember } from './section-member.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Division, (division) => division.sections, { onDelete: 'CASCADE' })
  division: Division;

  @OneToMany(() => SectionMember, (member) => member.section, { cascade: true })
  sectionMembers: SectionMember[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}