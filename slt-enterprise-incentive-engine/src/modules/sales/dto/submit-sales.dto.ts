import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SubmitSalesDto {
  @IsString()
  @IsNotEmpty()
  orderReference: string;

  @IsNumber()
  @Min(0.01)
  totalAmount: number;
}