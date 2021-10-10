import ErrorApp from '@shared/errors/ErrorApp';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrder } from '../domain/models/IOrder';

@injectable()
export default class ListOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<IOrder[]> {
    const orders = await this.ordersRepository.findAll();
    if (orders.length < 1) {
      throw new ErrorApp('Lista  vazia!');
    }
    return orders;
  }
}
