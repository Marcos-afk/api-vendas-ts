import ErrorApp from '@shared/errors/ErrorApp';
import { compare, hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({
    user_id,
    name,
    email,
    newPassword,
    oldPassword,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new ErrorApp('Id inválido');
    }

    const emailIsExist = await this.usersRepository.findByEmail(email);
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
    await this.usersRepository.save(user);
    return user;
  }
}
