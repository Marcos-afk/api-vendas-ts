import RedisCache from '@shared/cache/RedisCache';
import ErrorApp from '@shared/errors/ErrorApp';
import { inject, injectable } from 'tsyringe';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}
  public async execute({
    id,
    name,
    price,
    amount,
    description,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new ErrorApp('Id inválido!');
    }

    const isExisting = await this.productsRepository.findByName(name);
    if (isExisting && isExisting.name !== product.name) {
      throw new ErrorApp('Nome inválido!', 400);
    }

    product.name = name;
    product.price = price;
    product.amount = amount;
    product.description = description;

    await RedisCache.invalidate('api-vendas-products');
    await this.productsRepository.save(product);
    return product;
  }
}
