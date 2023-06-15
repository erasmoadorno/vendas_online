/* eslint-disable prettier/prettier */

import { ReturnCategoryDto } from 'src/category/dto/return-category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ReturnProductDto {
  idproduct: string;
  price: number;
  name: string;
  image: string;
  category: ReturnCategoryDto;
  constructor(productEntity: ProductEntity) {
    this.name = productEntity.name;
    this.idproduct = productEntity.idproduct;
    this.price = productEntity.price;
    this.image = productEntity.image;
    this.category = productEntity.categoryEnt
      ? new ReturnCategoryDto(productEntity.categoryEnt)
      : undefined;
  }
}
