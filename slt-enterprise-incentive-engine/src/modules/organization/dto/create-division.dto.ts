import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateDivisionDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;
}