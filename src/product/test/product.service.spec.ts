import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../mocks/product.mock';
import { createProductMock } from '../mocks/create-product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/mocks/category.mock';
import { returnDeleteMock } from '../../mocks/return-delete.mock';
import { updateProductMock } from '../mocks/update-product.mock';

describe('ProductService', () => {
  let service: ProductService;
  let categoryService: CategoryService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            findOne: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return product after save', async () => {
    const product = await service.create(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return error', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(service.create).rejects.toThrowError();
  });

  it('should return a list of products by name', async () => {
    const product = await service.findByName(productMock.name);

    expect(product).toEqual(productMock);
  });

  it('should return empty list error', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.findByName).rejects.toThrowError();
  });

  it('should return error of find products by name field', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findByName).rejects.toThrowError();
  });

  it('should return a product by search id', async () => {
    const product = await service.findById(productMock.idproduct);

    expect(product).toEqual(productMock);
  });

  it('should return error in empty list', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

    expect(service.findById).rejects.toThrowError();
  });

  it('should return category by id', async () => {
    const category = await categoryService.findById(categoryMock.idcategory);

    expect(category).toEqual(categoryMock);
  });

  it('should return error in find by id field', async () => {
    jest.spyOn(productRepository, 'findOne').mockRejectedValue(new Error());

    expect(service.findById).rejects.toThrowError();
  });

  it('should delete a product item', async () => {
    const deleted = await service.delete(productMock.idproduct);

    expect(deleted).toEqual(returnDeleteMock);
  });

  it('should deletion error after sending undefined param id', async () => {
    jest.spyOn(productRepository, 'delete').mockResolvedValue(undefined);

    expect(service.delete).rejects.toThrowError();
  });

  it('should return product after updated it', async () => {
    const product = await service.update(
      productMock.idproduct,
      updateProductMock,
    );

    expect(product).toEqual(productMock);
  });

  it('should return error on update function', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.update(productMock.idproduct, updateProductMock),
    ).rejects.toThrowError();
  });
});
