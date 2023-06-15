import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.findById(createProductDto.category);

    return this.productRepository.save({ ...createProductDto });
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: { categoryEnt: true },
    });
    if (!products || products.length === 0) {
      throw new NotFoundException('Not found products');
    }

    return products;
  }

  async findByName(name: string): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      where: { name },
      relations: { categoryEnt: true },
    });

    if (!products || products.length === 0) {
      throw new NotFoundException(`Not found any ${name} in products list.`);
    }

    return products;
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { idproduct: id },
    });

    if (!product) {
      throw new NotFoundException(`Not found product by ${id} id.`);
    }

    return product;
  }

  async delete(id: string): Promise<DeleteResult> {
    await this.findById(id);

    return this.productRepository.delete({ idproduct: id });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.findById(id);

    return this.productRepository.save({ ...product, ...updateProductDto });
  }
}
