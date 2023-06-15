import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.findByName(createCategoryDto.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category name ${createCategoryDto.name} already exist!`,
      );
    }

    return this.categoryRepository.save(createCategoryDto);
  }

  async findById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        idcategory: id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category id not founded.');
    }

    return category;
  }

  async findByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { name } });

    if (!category) {
      throw new NotFoundException(`Category name ${name} not found`);
    }

    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    if (!categories) {
      throw new NotFoundException('Categories not found');
    }

    if (categories.length === 0) {
      throw new NotFoundException('No category registered');
    }

    return categories;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
