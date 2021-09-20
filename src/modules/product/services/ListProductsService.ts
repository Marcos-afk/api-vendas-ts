import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

export default class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('api-vendas-products');

    if (!products) {
      products = await productsRepository.find();
      await redisCache.save('api-vendas-products', products);
    }
    return products;
  }
}
