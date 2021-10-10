import ErrorApp from '@shared/errors/ErrorApp';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrder } from '../domain/models/IOrder';

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new ErrorApp('Id  inválido');
    }
    return order;
  }
}
