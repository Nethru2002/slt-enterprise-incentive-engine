import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from '../entities/section.entity';
import { Division } from '../entities/division.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section) private readonly sectionRepo: Repository<Section>,
    @InjectRepository(Division) private readonly divisionRepo: Repository<Division>,
  ) {}

  async create(name: string, divisionId: string): Promise<Section> {
    const division = await this.divisionRepo.findOne({ where: { id: divisionId } });
    if (!division) throw new NotFoundException('Parent Division not found');
    
    const section = this.sectionRepo.create({ name, division });
    return this.sectionRepo.save(section);
  }

  async findAll(): Promise<Section[]> {
    return this.sectionRepo.find({ 
      relations: { division: true, sectionMembers: true } 
    });
  }
}