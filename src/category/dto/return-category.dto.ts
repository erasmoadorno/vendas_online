/* eslint-disable prettier/prettier */
import { CategoryEntity } from "../entities/category.entity";

export class ReturnCategoryDto {
  name: string;
  idcategory: string;
  constructor(categoryEntity: CategoryEntity){
    this.name = categoryEntity.name;
    this.idcategory = categoryEntity.idcategory;
  }
}
