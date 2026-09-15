import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeRepository extends Repository<Employee> {
  constructor(private dataSource: DataSource) {
    super(Employee, dataSource.createEntityManager());
  }

  async findByEmployeeId(employeeId: string): Promise<Employee | null> {
    return this.findOne({ where: { employeeId } });
  }
}