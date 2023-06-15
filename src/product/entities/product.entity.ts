/* eslint-disable prettier/prettier */
import { CategoryEntity } from '../../category/entities/category.entity';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { CartProductEntity } from '../../cart-product/entities/cart-product.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  idproduct: string;

  @Column({name: 'category', nullable: false })
  category: string;

  @Column({name: 'price', nullable: false })
  price: number;

  @Column({name: 'name', nullable: false })
  name: string;

  @Column({name: 'image', nullable: false })
  image: string;

  @CreateDateColumn({name: 'created_at', nullable: false})
  created_at: Date;

  @UpdateDateColumn({name: 'updated_at', nullable: false})
  updated_at: Date;

  @ManyToOne (() => CategoryEntity, (category: CategoryEntity) => category.categoryProducts)
  @JoinColumn({name: 'category', referencedColumnName: 'idcategory' })
  categoryEnt?: CategoryEntity 

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cartEntity )
  cartProduct?: CartProductEntity[];
}
