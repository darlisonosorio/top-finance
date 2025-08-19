import { IsBoolean, IsCurrency, IsDate, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class FinanceForm {

  @IsNumber()
  user_id: number;
  
  @IsCurrency()
  value: string;

  @IsString()
  @MaxLength(256)
  description: string;
  
  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;

  @IsOptional()
  created_at?: Date;
}