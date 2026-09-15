import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { Section } from './section.entity';

@Entity('section_members')
export class SectionMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
  employee: Employee;

  @ManyToOne(() => Section, (section) => section.sectionMembers, { onDelete: 'CASCADE' })
  section: Section;

  @CreateDateColumn()
  joinedAt: Date;
}