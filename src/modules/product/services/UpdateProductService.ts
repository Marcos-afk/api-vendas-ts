import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  amount: number;
  description: string;
}
export default class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    amount,
    description,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new ErrorApp('Produto com este id não encontrado!');
    }

    const isExisting = await productsRepository.findByName(name);
    if (isExisting && isExisting.name !== product.name) {
      throw new ErrorApp('Um produto com este nome já existe no sistema!', 406);
    }

    product.name = name;
    product.price = price;
    product.amount = amount;
    product.description = description;

    await productsRepository.save(product);
    return product;
  }
}
