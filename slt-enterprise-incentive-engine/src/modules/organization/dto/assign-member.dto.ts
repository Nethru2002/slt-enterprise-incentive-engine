import { IsUUID, IsNotEmpty } from 'class-validator';

export class AssignMemberDto {
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @IsUUID()
  @IsNotEmpty()
  targetId: string; // Section ID or Solution Team ID
}