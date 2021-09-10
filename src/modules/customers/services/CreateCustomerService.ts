import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository);
    const isExisting = await customersRepository.findByEmail(email);
    if (isExisting) {
      throw new ErrorApp('Email inválido!', 400);
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);
    return customer;
  }
}
