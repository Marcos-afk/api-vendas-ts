import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/providers/storageProvider/S3StorageProvider';
import DiskStorageProvider from '@shared/providers/storageProvider/DiskStorageProvider';

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

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      const filename = await s3Provider.saveFile(avatarFilename);
      user.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }
      const filename = await diskProvider.saveFile(avatarFilename);
      user.avatar = filename;
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}
