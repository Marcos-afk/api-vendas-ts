import ErrorApp from '@shared/errors/ErrorApp';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new ErrorApp('Id inválido');
    }
    return user;
  }
}
