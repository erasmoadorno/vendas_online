import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../mocks/category.mock';
import { createCategoryMock } from '../mocks/create-category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockReturnValue(categoryMock),
            findOne: jest.fn().mockReturnValue(categoryMock),
            save: jest.fn().mockReturnValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    const category = await service.create(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return all categories', async () => {
    const categories = await service.findAll();

    expect(categories).toEqual(categoryMock);
  });

  it('should return a empty list error', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(service.findAll).rejects.toThrowError();
  });

  it('should return find errors', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAll).rejects.toThrowError();
  });

  it('should return error after get the same category name', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(categoryMock);

    expect(service.create(createCategoryMock)).rejects.toThrowError();
  });

  it('should get error in category save function', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    expect(service.create(createCategoryMock)).rejects.toThrowError();
  });

  it('should return a category by name', async () => {
    const category = await service.findByName(categoryMock.name);

    expect(category).toEqual(categoryMock);
  });

  it('should return error of not found category name', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findByName(categoryMock.name)).rejects.toThrowError();
  });

  it('should return category by id parameter', async () => {
    const category = await service.findById(categoryMock.idcategory);

    expect(category).toEqual(categoryMock);
  });

  it('should return error in not found category id', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(categoryMock.idcategory)).rejects.toThrowError();
  });
});
