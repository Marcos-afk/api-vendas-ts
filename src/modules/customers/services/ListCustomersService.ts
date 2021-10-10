import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';
import ErrorApp from 'dist/shared/errors/ErrorApp';

@injectable()
export default class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute(): Promise<ICustomer[] | undefined> {
    const customers = await this.customersRepository.find();
    if (customers && customers.length < 1) {
      throw new ErrorApp('Lista de clientes vazia!');
    }

    return customers;
  }
}
