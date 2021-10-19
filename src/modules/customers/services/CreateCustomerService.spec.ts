import ErrorApp from '@shared/errors/ErrorApp';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCutomersRepository';
import CreateCustomerService from './CreateCustomerService';

describe('Create customer', () => {
  it('Should be able to create a new  customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    const customer = await createCustomerService.execute({
      name: 'Marcos Lima',
      email: 'teste@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Client not created. The email already exists in the system.', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

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
