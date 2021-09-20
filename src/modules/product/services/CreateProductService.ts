import RedisCache from '@shared/cache/RedisCache';
import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
interface IRequest {
  name: string;
  price: number;
  amount: number;
  description: string;
}

export default class CreateProductService {
  public async execute({
    name,
    price,
    amount,
    description,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const isExisting = await productsRepository.findByName(name);
    if (isExisting) {
      throw new ErrorApp('Nome inválido!', 400);
    }

    const redisCache = new RedisCache();

    const product = productsRepository.create({
      name,
      price,
      amount,
      description,
    });

    await redisCache.invalidate('api-vendas-products');
    await productsRepository.save(product);
    return product;
  }
}
