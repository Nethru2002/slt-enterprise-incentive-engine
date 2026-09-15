import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './entities/division.entity';
import { Section } from './entities/section.entity';
import { SectionMember } from './entities/section-member.entity';
import { SolutionTeam } from './entities/solution-team.entity';
import { SolutionTeamMember } from './entities/solution-team-member.entity';
import { DivisionService } from './services/division.service';
import { SectionService } from './services/section.service';
import { SolutionTeamService } from './services/solution-team.service';
import { DivisionController } from './controllers/division.controller';
import { SectionController } from './controllers/section.controller';
import { SolutionTeamController } from './controllers/solution-team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Division, Section, SectionMember, SolutionTeam, SolutionTeamMember])],
  controllers: [DivisionController, SectionController, SolutionTeamController],
  providers: [DivisionService, SectionService, SolutionTeamService],
  exports: [DivisionService, SectionService, SolutionTeamService],
})
export class OrganizationModule {}