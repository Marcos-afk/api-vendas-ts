import RedisCache from '@shared/cache/RedisCache';
import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new ErrorApp('Id inválido!');
    }
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-products');
    await productsRepository.remove(product);
  }
}
