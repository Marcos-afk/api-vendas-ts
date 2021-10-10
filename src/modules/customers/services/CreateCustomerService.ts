import ErrorApp from '@shared/errors/ErrorApp';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const isExisting = await this.customersRepository.findByEmail(email);
    if (isExisting) {
      throw new ErrorApp('Email inválido!', 400);
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}
