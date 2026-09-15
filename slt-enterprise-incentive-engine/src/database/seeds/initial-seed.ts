import { DataSource } from 'typeorm';
import { Division } from '../../modules/organization/entities/division.entity';
import { Employee } from '../../modules/employee/entities/employee.entity';

export async function seedDatabase(dataSource: DataSource) {
  const divisionRepo = dataSource.getRepository(Division);
  const employeeRepo = dataSource.getRepository(Employee);

  const enterpriseDiv = divisionRepo.create({ name: 'Enterprise Business Division' });
  await divisionRepo.save(enterpriseDiv);

  const adminEmployee = employeeRepo.create({
    employeeId: 'EMP-001',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@slt.com.lk',
    role: 'ADMIN',
    position: 'Chief Information Officer',
    amCode: 'AM-999',
  });
  await employeeRepo.save(adminEmployee);

  console.log('Database initial seed executed successfully.');
}