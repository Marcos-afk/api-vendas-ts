import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IRequest {
  id: string;
}

@EntityRepository(Product)
export default class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({ where: { name } });
    return product;
  }

  public async findAllById(products: IRequest[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const productsIsExist = await this.find({ where: { id: In(productsIds) } });
    return productsIsExist;
  }
}
