import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data: Product[];
}
export default class ListProductsService {
  public async execute(): Promise<IRequest> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository
      .createQueryBuilder('products')
      .paginate();
    return products as IRequest;
  }
}
