import { CartProductEntity } from '../../cart-product/entities/cart-product.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  idcart: string;

  @Column({ name: 'userid', nullable: false })
  userid: string;

  @Column({ name: 'active', nullable: false })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cartEntity)
  cartProduct?: CartProductEntity[];
}
