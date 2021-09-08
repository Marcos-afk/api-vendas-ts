import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new ErrorApp('Email inválido!');
    }

    const token = await usersTokenRepository.generate(user.id);
    console.log(token);
  }
}
