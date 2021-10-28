import ErrorApp from '@shared/errors/ErrorApp';
import 'reflect-metadata';
import FakeHashProvider from '../domain/repositories/fakes/FakeHashProvider';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Marcos Lima',
      email: 'teste@gmail.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });

  it('User not created. The email already exists in the system.', async () => {
    await createUserService.execute({
      name: 'Marcos Lima',
      email: 'teste@gmail.com',
      password: '12345678',
    });

    expect(
      createUserService.execute({
        name: 'Marcos Lima',
        email: 'teste@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(ErrorApp);
  });
});
