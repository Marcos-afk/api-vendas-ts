import RedisCache from '@shared/cache/RedisCache';
import ErrorApp from '@shared/errors/ErrorApp';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}
  public async execute({
    name,
    price,
    amount,
    description,
  }: ICreateProduct): Promise<IProduct> {
    const isExisting = await this.productsRepository.findByName(name);
    if (isExisting) {
      throw new ErrorApp('Nome inválido!', 400);
    }

    await RedisCache.invalidate('api-vendas-products');
    const product = await this.productsRepository.create({
      name,
      price,
      amount,
      description,
    });
    return product;
  }
}
