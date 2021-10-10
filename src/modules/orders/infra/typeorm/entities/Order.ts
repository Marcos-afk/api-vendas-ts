import { IOrder } from '@modules/orders/domain/models/IOrder';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from './OrdersProducts';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export default class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  order: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
