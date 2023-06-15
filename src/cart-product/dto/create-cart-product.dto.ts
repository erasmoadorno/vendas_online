import { IsInt, IsString } from 'class-validator';

export class CreateCartProductDto {
  @IsString()
  cartid: string;
  @IsString()
  productid: string;
  @IsInt()
  amount: number;
}
