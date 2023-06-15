import { CartEntity } from '../../cart/entities/cart.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cart_product' })
export class CartProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id_cart_product: string;

  @Column({ name: 'cartid', nullable: false })
  cartid: string;

  @Column({ name: 'productid', nullable: false })
  productid: string;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updated_at: Date;

  @ManyToOne(() => ProductEntity, (product) => product.cartProduct)
  @JoinColumn({ name: 'productid', referencedColumnName: 'idproduct' })
  productEntity?: ProductEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.cartProduct)
  @JoinColumn({ name: 'cartid', referencedColumnName: 'idcart' })
  cartEntity?: CartEntity;
}
