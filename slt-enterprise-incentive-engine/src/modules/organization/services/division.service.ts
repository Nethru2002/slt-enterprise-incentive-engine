import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from '../entities/division.entity';
import { CreateDivisionDto } from '../dto/create-division.dto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepo: Repository<Division>,
  ) {}

  async create(dto: CreateDivisionDto): Promise<Division> {
    const division = this.divisionRepo.create(dto);
    return this.divisionRepo.save(division);
  }

  async findAll(): Promise<Division[]> {
    return this.divisionRepo.find({ relations: { sections: true } });
  }

  async findOne(id: string): Promise<Division> {
    const div = await this.divisionRepo.findOne({ 
      where: { id }, 
      relations: { sections: true } 
    });
    if (!div) throw new NotFoundException('Division not found');
    return div;
  }
}