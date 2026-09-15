import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './entities/sales.entity';
import { SalesApproval } from './entities/sales-approval.entity';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sales, SalesApproval])],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}