import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SolutionTeamMember } from './solution-team-member.entity';

@Entity('solution_teams')
export class SolutionTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => SolutionTeamMember, (member) => member.solutionTeam, { cascade: true })
  teamMembers: SolutionTeamMember[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}