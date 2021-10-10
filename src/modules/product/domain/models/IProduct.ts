import { IOrderProducts } from '@modules/orders/domain/models/IOrderProducts';

export interface IProduct {
  id: string;
  orders_products: IOrderProducts[];
  name: string;
  price: number;
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
