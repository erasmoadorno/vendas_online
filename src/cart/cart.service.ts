import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertCartDto } from './dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartProductService } from '../cart-product/cart-product.service';
import { UpdateCartDto } from './dto/update-cart.dto';

const AFFECTED_NUMBER = 1;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async createCart(userId: string): Promise<CartEntity> {
    return this.cartRepository.save({ userid: userId, active: true });
  }

  async insertCart(
    insertCartDto: InsertCartDto,
    userId: string,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(() => undefined);

    if (!cart) {
      return this.createCart(userId);
    }

    await this.cartProductService.insertProductInCart({
      amount: insertCartDto.amount,
      productid: insertCartDto.idproduct,
      cartid: cart.idcart,
    });

    return this.findCartByUserId(userId, true);
  }

  async findCartByUserId(
    userId: string,
    isRelation?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelation
      ? { cartProduct: { productEntity: true } }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: { userid: userId, active: true },
      relations,
    });

    if (!cart) {
      throw new NotFoundException('Not found active cart');
    }

    return cart;
  }

  async updateProductInCart(
    updateCartDTO: UpdateCartDto,
    userid: string,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userid).catch(() => undefined);

    if (!cart) {
      return this.createCart(userid);
    }

    await this.cartProductService.updateProductInCart(updateCartDTO, cart);

    return cart;
  }

  async clearCart(userId: string): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);
    await this.cartRepository.save({ ...cart, active: false });
    return { raw: [], affected: AFFECTED_NUMBER };
  }

  async deleteProductInCart(
    userid: string,
    productId: string,
  ): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userid);
    return this.cartProductService.deleteProductInCart(cart.idcart, productId);
  }
}
