import { IProduct } from '@modules/product/domain/models/IProduct';

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProduct[];
}
