import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DivisionService } from '../services/division.service';
import { CreateDivisionDto } from '../dto/create-division.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('organizations/divisions')
@UseGuards(JwtAuthGuard)
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  create(@Body() dto: CreateDivisionDto) {
    return this.divisionService.create(dto);
  }

  @Get()
  findAll() {
    return this.divisionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divisionService.findOne(id);
  }
}