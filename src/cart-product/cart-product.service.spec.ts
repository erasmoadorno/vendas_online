import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from './cart-product.service';
import { CartProductEntity } from './entities/cart-product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CartProductService', () => {
  let service: CartProductService;
  let productCartRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productCartRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productCartRepository).toBeDefined();
  });
});
