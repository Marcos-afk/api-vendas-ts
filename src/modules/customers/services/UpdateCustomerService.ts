import ErrorApp from '@shared/errors/ErrorApp';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new ErrorApp('Id inválido');
    }

    const emailIsExist = await this.customersRepository.findByEmail(email);
    if (emailIsExist && emailIsExist.email !== customer.email) {
      throw new ErrorApp('Email inválido!', 400);
    }

    customer.name = name;
    customer.email = email;
    await this.customersRepository.save(customer);
    return customer;
  }
}
