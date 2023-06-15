import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductService } from './cart-product.service';
import { CartProductEntity } from './entities/cart-product.entity';
// import { CartProductController } from './cart-product.controller';

@Module({
  // controllers: [CartProductController],
  imports: [TypeOrmModule.forFeature([CartProductEntity])],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
