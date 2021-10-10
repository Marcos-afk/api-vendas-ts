import ErrorApp from '@shared/errors/ErrorApp';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';
import { IFindCustomer } from '../domain/models/IFindCustomer';

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({ id }: IFindCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new ErrorApp('Id inválido');
    }
    return customer;
  }
}
