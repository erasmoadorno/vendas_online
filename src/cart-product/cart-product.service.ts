import { Injectable, NotFoundException } from '@nestjs/common';
import { CartProductEntity } from './entities/cart-product.entity';
import { Repository, DeleteResult } from 'typeorm';
import { InsertCartDto } from 'src/cart/dto/create-cart.dto';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCartDto } from 'src/cart/dto/update-cart.dto';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProdRepository: Repository<CartProductEntity>,
  ) {}

  async verifyCartProduct(
    cartid: string,
    productid: string,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProdRepository.findOne({
      where: { productid, cartid },
    });

    if (!cartProduct) {
      throw new NotFoundException('Not found product in cart');
    }

    return cartProduct;
  }

  async createCartProduct(
    insertCartDto: InsertCartDto,
    cartid: string,
  ): Promise<CartProductEntity> {
    return this.cartProdRepository.save({
      amount: insertCartDto.amount,
      productid: insertCartDto.idproduct,
      cartid,
    });
  }

  async insertProductInCart(
    createCartProductDto: CreateCartProductDto,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.verifyCartProduct(
      createCartProductDto.cartid,
      createCartProductDto.productid,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createCartProduct(
        {
          amount: createCartProductDto.amount,
          idproduct: createCartProductDto.productid,
        },
        createCartProductDto.cartid,
      );
    }

    return this.cartProdRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + createCartProductDto.amount,
    });
  }

  async updateProductInCart(
    updateCartDto: UpdateCartDto,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    const cartProd = await this.verifyCartProduct(
      cart.idcart,
      updateCartDto.idproduct,
    ).catch(() => undefined);

    if (!cartProd) {
      throw new NotFoundException('Product not found in cart');
    }

    return this.cartProdRepository.save({
      ...cartProd,
      amount: updateCartDto.amount,
    });
  }

  async deleteProductInCart(
    cartid: string,
    productid: string,
  ): Promise<DeleteResult> {
    return this.cartProdRepository.delete({ productid, cartid });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} cartProduct`;
  // }
}
