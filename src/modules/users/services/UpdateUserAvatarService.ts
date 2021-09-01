import ErrorApp from '@shared/errors/ErrorApp';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  avatarFilename: string;
  userId: string;
}

export default class UpdateUserAvatarService {
  public async execute({ avatarFilename, userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new ErrorApp('Id inválido');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}
