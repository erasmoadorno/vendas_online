/* eslint-disable prettier/prettier */
import { ReturnCartDto } from 'src/cart/dto/return-cart.dto';
import { ReturnProductDto } from 'src/product/dto/return-product.dto';
import { CartProductEntity } from '../entities/cart-product.entity';

export class ReturnCartProductDto {
  amount: number;
  cartid: string;
  productid: string;
  cart?: ReturnCartDto;
  product?: ReturnProductDto;

  constructor(cartProd: CartProductEntity) {
    this.cartid = cartProd.cartid;
    this.productid = cartProd.productid;
    this.amount = cartProd.amount;
    this.cart = cartProd.cartEntity
      ? new ReturnCartDto(cartProd.cartEntity)
      : undefined;
    this.product = cartProd.productEntity
      ? new ReturnProductDto(cartProd.productEntity)
      : undefined;
  }
}
