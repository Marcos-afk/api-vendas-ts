import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import ErrorApp from '@shared/errors/ErrorApp';

interface IRequest {
  user_id: string;
}
export default class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new ErrorApp('Id inválido');
    }
    return user;
  }
}
