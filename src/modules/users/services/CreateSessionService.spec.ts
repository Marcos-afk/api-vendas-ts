import ErrorApp from '@shared/errors/ErrorApp';
import 'reflect-metadata';
import FakeHashProvider from '../domain/repositories/fakes/FakeHashProvider';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import CreateSessionService from './CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let createSessionService: CreateSessionService;
let fakeHashProvider: FakeHashProvider;

describe('Create Session', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Marcos André',
      email: 'teste@gmail.com',
      password: '12345678',
    });

    const response = await createSessionService.execute({
      email: 'teste@gmail.com',
      password: '12345678',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user.', async () => {
    expect(
      createSessionService.execute({
        email: 'teste@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(ErrorApp);
  });

  it('should not be able to authenticate with wrong password.', async () => {
    await fakeUsersRepository.create({
      name: 'Marcos André',
      email: 'teste@gmail.com',
      password: '12345678',
    });

    expect(
      createSessionService.execute({
        email: 'teste@gmail.com',
        password: '12345679',
      }),
    ).rejects.toBeInstanceOf(ErrorApp);
  });
});
