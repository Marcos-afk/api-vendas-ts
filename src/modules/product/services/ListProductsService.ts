import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
export default class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(): Promise<IProduct[]> {
    let products = await RedisCache.recover<IProduct[]>('api-vendas-products');

    if (!products) {
      products = await this.productsRepository.findAll();
      await RedisCache.save('api-vendas-products', products);
    }
    return products;
  }
}
