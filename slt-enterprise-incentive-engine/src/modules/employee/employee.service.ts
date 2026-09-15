import { Injectable, ConflictException } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async create(createDto: CreateEmployeeDto): Promise<Employee> {
    const existing = await this.employeeRepository.findByEmployeeId(createDto.employeeId);
    if (existing) {
      throw new ConflictException('Employee with this ID already exists.');
    }
    const employee = this.employeeRepository.create(createDto);
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
}