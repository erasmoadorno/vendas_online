import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  complement: string;
  @IsInt()
  number: number;
  @IsString()
  cep: string;
  @IsInt()
  city: string;
}
