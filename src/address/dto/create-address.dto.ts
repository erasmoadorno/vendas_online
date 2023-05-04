import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAddressDto {
  readonly idaddress: string;
  @IsString()
  readonly complement: string;
  @IsInt()
  readonly number: number;
  @IsString()
  readonly cep: string;
  @IsInt()
  readonly city: number;
}
