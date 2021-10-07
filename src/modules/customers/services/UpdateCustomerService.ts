import { getCustomRepository } from 'typeorm';
import ErrorApp from '@shared/errors/ErrorApp';
import Customer from '../infra/typeorm/entities/Customer';
import CustomerRepository from '../infra/typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new ErrorApp('Id inválido');
    }

    const emailIsExist = await customerRepository.findByEmail(email);
    if (emailIsExist && emailIsExist.email !== customer.email) {
      throw new ErrorApp('Email inválido!', 400);
    }

    customer.name = name;
    customer.email = email;
    await customerRepository.save(customer);
    return customer;
  }
}
