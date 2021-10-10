import { IProduct } from '@modules/product/domain/models/IProduct';
import { IOrder } from './IOrder';

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
