import ErrorApp from '@shared/errors/ErrorApp';
import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const isExisting = await usersRepository.findByEmail(email);
    if (isExisting) {
      throw new ErrorApp('Email inválido!', 400);
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}
