import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SolutionTeamService } from '../services/solution-team.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('organizations/solution-teams')
@UseGuards(JwtAuthGuard)
export class SolutionTeamController {
  constructor(private readonly teamService: SolutionTeamService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.teamService.create(name);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }
}