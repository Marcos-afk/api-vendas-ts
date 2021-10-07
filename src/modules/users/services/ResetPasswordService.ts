import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokenRepository';
import { hash } from 'bcrypt';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);
    const userToken = await usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new ErrorApp('Token inválido!');
    }

    if (!userToken.user_id) {
      throw new ErrorApp('Token de usuário inválido!');
    }

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new ErrorApp('Token de usuário inválido!');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new ErrorApp('Token expirado!', 400);
    }

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}
