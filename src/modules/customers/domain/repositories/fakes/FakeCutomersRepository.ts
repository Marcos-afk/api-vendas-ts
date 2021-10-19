import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { v4 } from 'uuid';
import { ICustomer } from '../../models/ICustomer';

export default class FakeCustomerRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  find(): Promise<ICustomer[] | undefined> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(customer: ICustomer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = v4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}
