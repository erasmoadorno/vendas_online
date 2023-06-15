import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { UserId } from 'src/decorators/user-id/user-id.decorator';
import { TypeUser } from 'src/user/enum/type-user.enum';
import { CartService } from './cart.service';
import { InsertCartDto } from './dto/create-cart.dto';
import { ReturnCartDto } from './dto/return-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
// import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(TypeUser.User)
  async create(
    @Body() createCartDto: InsertCartDto,
    @UserId() userId: string,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertCart(createCartDto, userId),
    );
  }

  @Get()
  async findCartByUserId(@UserId() userId: string): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.findCartByUserId(userId, true),
    );
  }

  @Delete()
  async clearCart(@UserId() userId: string): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateProductInCart(
    @Body() updateCartDTO: UpdateCartDto,
    @UserId() userId: string,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.updateProductInCart(updateCartDTO, userId),
    );
  }

  @Delete('/product/:productId')
  async deleteProductInCart(
    @Param('productId') productId: string,
    @UserId() userid: string,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductInCart(userid, productId);
  }
}
