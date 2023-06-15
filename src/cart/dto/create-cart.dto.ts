import { IsString, IsInt } from 'class-validator';

export class InsertCartDto {
  @IsString()
  idproduct: string;
  @IsInt()
  amount: number;
}
