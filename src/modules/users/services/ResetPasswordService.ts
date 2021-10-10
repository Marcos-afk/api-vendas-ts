import ErrorApp from '@shared/errors/ErrorApp';
import { hash } from 'bcrypt';
import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new ErrorApp('Token inválido!');
    }

    if (!userToken.user_id) {
      throw new ErrorApp('Token de usuário inválido!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new ErrorApp('Token de usuário inválido!');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new ErrorApp('Token expirado!', 400);
    }

    user.password = await hash(password, 8);
    await this.usersRepository.save(user);
  }
}
