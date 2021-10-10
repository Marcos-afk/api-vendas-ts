import { ICreateProduct } from '@modules/product/domain/models/ICreateProduct';
import { IUpdateStockProduct } from '@modules/product/domain/models/IUpdateStockProduct';
import { IProductRepository } from '@modules/product/domain/repositories/IProductRepository';
import { EntityRepository, getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IRequest {
  id: string;
}

@EntityRepository(Product)
export default class ProductsRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    amount,
    description,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      amount,
      description,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findAllByIds(products: IRequest[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const productsIsExist = await this.ormRepository.find({
      where: { id: In(productsIds) },
    });
    return productsIsExist;
  }
}
