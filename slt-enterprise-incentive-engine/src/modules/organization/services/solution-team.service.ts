import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolutionTeam } from '../entities/solution-team.entity';

@Injectable()
export class SolutionTeamService {
  constructor(
    @InjectRepository(SolutionTeam) private readonly teamRepo: Repository<SolutionTeam>,
  ) {}

  async create(name: string): Promise<SolutionTeam> {
    const team = this.teamRepo.create({ name });
    return this.teamRepo.save(team);
  }

  async findAll(): Promise<SolutionTeam[]> {
    return this.teamRepo.find({ 
      relations: { teamMembers: true } 
    });
  }
}