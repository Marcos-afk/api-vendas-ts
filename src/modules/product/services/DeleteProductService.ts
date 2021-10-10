import RedisCache from '@shared/cache/RedisCache';
import ErrorApp from '@shared/errors/ErrorApp';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IShowProduct } from '../domain/models/IShowProduct';

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}
  public async execute({ id }: IShowProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new ErrorApp('Id inválido!');
    }

    await RedisCache.invalidate('api-vendas-products');
    await this.productsRepository.remove(product);
  }
}
