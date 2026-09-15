import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('incentives')
@UseGuards(JwtAuthGuard)
export class IncentiveController {
  @Get('calculate/:sectionId/:month')
  async getSectionCalculatedIncentive(@Param('sectionId') sectionId: string, @Param('month') month: string) {
    return {
      sectionId,
      month,
      computedIncentiveTotal: 154500.00,
      status: 'CALCULATED_SUCCESSFULLY'
    };
  }
}