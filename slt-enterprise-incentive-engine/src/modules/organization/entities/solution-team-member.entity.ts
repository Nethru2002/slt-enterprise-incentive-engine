import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { SolutionTeam } from './solution-team.entity';

@Entity('solution_team_members')
export class SolutionTeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
  employee: Employee;

  @ManyToOne(() => SolutionTeam, (team) => team.teamMembers, { onDelete: 'CASCADE' })
  solutionTeam: SolutionTeam;

  @CreateDateColumn()
  joinedAt: Date;
}