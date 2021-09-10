import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import ErrorApp from '@shared/errors/ErrorApp';
import { compare, hash } from 'bcrypt';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  newPassword?: string;
  oldPassword?: string;
}
export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    newPassword,
    oldPassword,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new ErrorApp('Id inválido');
    }

    const emailIsExist = await usersRepository.findByEmail(email);
    if (emailIsExist && emailIsExist.email !== user.email) {
      throw new ErrorApp('Email inválido!', 400);
    }

    if (newPassword && !oldPassword) {
      throw new ErrorApp('Senha antiga requerida!', 400);
    }
    if (newPassword && oldPassword) {
      const confirmPassword = await compare(oldPassword, user.password);

      if (!confirmPassword) {
        throw new ErrorApp('Senha inválida!', 400);
      }

      if (oldPassword === newPassword) {
        throw new ErrorApp('Senha nova não pode ser igual a antiga', 400);
      }

      user.password = await hash(newPassword, 8);
    }

    user.name = name;
    user.email = email;
    await usersRepository.save(user);
    return user;
  }
}
