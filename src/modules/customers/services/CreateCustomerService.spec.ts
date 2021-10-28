import ErrorApp from '@shared/errors/ErrorApp';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCutomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('Create customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
  });
  it('Should be able to create a new  customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Marcos Lima',
      email: 'teste@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Client not created. The email already exists in the system.', async () => {
    await createCustomerService.execute({
      name: 'Marcos Lima',
      email: 'teste@gmail.com',
    });

    expect(
      createCustomerService.execute({
        name: 'Marcos Lima',
        email: 'teste@gmail.com',
      }),
    ).rejects.toBeInstanceOf(ErrorApp);
  });
});
