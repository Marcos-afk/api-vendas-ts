import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface IOrder {
  id: string;
  order: number;
  customer: ICustomer;
  order_products: ICreateOrderProducts[];
  createdAt: Date;
  updatedAt: Date;
}
