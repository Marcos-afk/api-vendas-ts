import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data: Customer[];
}

export default class ListCustomersService {
  public async execute(): Promise<IRequest> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository
      .createQueryBuilder('customers')
      .paginate();
    return customers as IRequest;
  }
}
