import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SectionService } from '../services/section.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('organizations/sections')
@UseGuards(JwtAuthGuard)
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body('name') name: string, @Body('divisionId') divisionId: string) {
    return this.sectionService.create(name, divisionId);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }
}