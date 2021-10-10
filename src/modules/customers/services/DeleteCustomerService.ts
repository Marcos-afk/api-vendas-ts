import ErrorApp from '@shared/errors/ErrorApp';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';
import { IFindCustomer } from '../domain/models/IFindCustomer';

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({ id }: IFindCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new ErrorApp('Id inválido!');
    }
    await this.customersRepository.remove(customer);
  }
}
