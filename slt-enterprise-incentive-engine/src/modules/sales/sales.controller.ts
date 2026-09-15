import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SubmitSalesDto } from './dto/submit-sales.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  submit(@Body() dto: SubmitSalesDto) {
    return this.salesService.submitSale(dto);
  }

  @Patch(':id/approve-l1')
  approveL1(@Param('id') id: string) {
    return this.salesService.processApproval(id, 'L1');
  }

  @Patch(':id/approve-l2')
  approveL2(@Param('id') id: string) {
    return this.salesService.processApproval(id, 'L2');
  }

  @Get('approved')
  getApproved() {
    return this.salesService.getFullyApprovedSales();
  }
}