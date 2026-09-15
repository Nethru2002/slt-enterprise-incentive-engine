import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import databaseConfig from './config/database.config';
import { OrganizationModule } from './modules/organization/organization.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { SyncModule } from './modules/sync/sync.module';
import { SalesModule } from './modules/sales/sales.module';
import { IncentiveModule } from './modules/incentives/incentive.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { HealthModule } from './modules/health/health.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database'),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    SharedModule,
    AuthModule,
    OrganizationModule,
    EmployeeModule,
    SyncModule,
    SalesModule,
    IncentiveModule,
    ReportingModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}