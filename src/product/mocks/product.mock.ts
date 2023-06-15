/* eslint-disable prettier/prettier */
import { categoryMock } from '../../category/mocks/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  category: categoryMock.idcategory,
  created_at: new Date(),
  idproduct: 'dsadas',
  image: 'dsadasdasdasdas.jpg',
  name: 'Product mock',
  price: 50.15,
  updated_at: new Date(),
};
