import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { IProduct } from '@modules/product/domain/models/IProduct';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export default class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  amount: number;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  orders_products: OrdersProducts[];

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
