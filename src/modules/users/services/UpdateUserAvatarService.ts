import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/providers/storageProvider/S3StorageProvider';
import DiskStorageProvider from '@shared/providers/storageProvider/DiskStorageProvider';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUser } from '../domain/models/IUser';
import ErrorApp from 'dist/shared/errors/ErrorApp';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({
    avatarFilename,
    userId,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);
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
    await this.usersRepository.save(user);
    return user;
  }
}
