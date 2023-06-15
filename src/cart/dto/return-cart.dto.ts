/* eslint-disable prettier/prettier */
import { CartEntity } from '../entities/cart.entity';
import { ReturnCartProductDto } from '../../cart-product/dto/return-cart-product.dto';

export class ReturnCartDto {
  cartId: string;
  cartProduct?: ReturnCartProductDto[];
  constructor(cartEntity: CartEntity) {
    this.cartId = cartEntity.idcart;
    this.cartProduct = cartEntity.cartProduct
        ? cartEntity.cartProduct.map(
            (cartProduct) => new ReturnCartProductDto(cartProduct),
          )
        : undefined;
  }
}
