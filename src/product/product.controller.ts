import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles/roles.decorator';
import { TypeUser } from '../user/enum/type-user.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { ReturnProductDto } from './dto/return-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(TypeUser.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAll()).map(
      (product) => new ReturnProductDto(product),
    );
  }

  @Get()
  async findByName(@Param() name: string): Promise<ProductEntity[]> {
    return await this.productService.findByName(name);
  }

  @Roles(TypeUser.Admin, TypeUser.User)
  @Get()
  async findById(@Param() id: string): Promise<ProductEntity> {
    return await this.productService.findById(id);
  }

  @Roles(TypeUser.Admin)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.delete(id);
  }

  @Roles(TypeUser.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.update(id, updateProductDto);
  }
}
