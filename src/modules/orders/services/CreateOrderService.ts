import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import ProductsRepository from '@modules/product/infra/typeorm/repositories/ProductsRepository';
import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  amount: number;
}
interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerIsExist = await customersRepository.findById(customer_id);
    if (!customerIsExist) {
      throw new ErrorApp('Id de cliente inválido');
    }

    const productsISExist = await productsRepository.findAllById(products);
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

    const order = await ordersRepository.createOrder({
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

    await productsRepository.save(updateAmount);
    return order;
  }
}
