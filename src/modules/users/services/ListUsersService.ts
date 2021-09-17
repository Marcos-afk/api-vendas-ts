import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data: User[];
}

export default class ListUsersService {
  public async execute(): Promise<IRequest> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.createQueryBuilder('users').paginate();
    return users as IRequest;
  }
}
