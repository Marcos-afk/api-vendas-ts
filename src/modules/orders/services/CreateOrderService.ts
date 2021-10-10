import ErrorApp from '@shared/errors/ErrorApp';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductRepository } from '@modules/product/domain/repositories/IProductRepository';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { IOrder } from '../domain/models/IOrder';
import RedisCache from '@shared/cache/RedisCache';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}
  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerIsExist = await this.customersRepository.findById(
      customer_id,
    );
    if (!customerIsExist) {
      throw new ErrorApp('Id de cliente inválido');
    }

    const productsISExist = await this.productsRepository.findAllByIds(
      products,
    );

    if (!productsISExist.length) {
      throw new ErrorApp('Ids inválidos');
    }

    const verifyProducts = productsISExist.map(product => product.id);

    const checkProducts = products.filter(
      product => !verifyProducts.includes(product.id),
    );

    if (checkProducts.length) {
      throw new ErrorApp(
        ` Produto com este id ${checkProducts[0].id} inválido `,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productsISExist.filter(p => p.id === product.id)[0].amount <
        product.amount,
    );

    if (quantityAvailable.length) {
      throw new ErrorApp(
        `Quantidade ${quantityAvailable[0].amount} inválida  do produto ${quantityAvailable[0].id}`,
      );
    }

    const serializedProduct = products.map(product => ({
      product_id: product.id,
      amount: product.amount,
      price: productsISExist.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerIsExist,
      products: serializedProduct,
    });

    const { order_products } = order;

    const updateAmount = order_products.map(product => ({
      id: product.product_id,
      amount:
        productsISExist.filter(p => p.id === product.product_id)[0].amount -
        product.amount,
    }));

    await RedisCache.invalidate('api-vendas-products');
    await this.productsRepository.updateStock(updateAmount);
    return order;
  }
}
