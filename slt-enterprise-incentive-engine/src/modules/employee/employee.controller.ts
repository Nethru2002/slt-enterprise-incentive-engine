import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/permissions.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async create(@Body() createDto: CreateEmployeeDto) {
    return this.employeeService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }
}