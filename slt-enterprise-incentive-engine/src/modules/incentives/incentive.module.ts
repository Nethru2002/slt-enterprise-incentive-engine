import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncentiveController } from './incentive.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    AuthModule,
  ],
  controllers: [IncentiveController],
})
export class IncentiveModule {}