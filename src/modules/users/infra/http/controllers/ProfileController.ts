import { Request, Response } from 'express';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class ProfileController {
  public async getBy(req: Request, res: Response): Promise<Response> {
    const id = req.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ id });
    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { email, name, newPassword, oldPassword } = req.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      user_id,
      email,
      name,
      newPassword,
      oldPassword,
    });
    return res.json(classToClass(user));
  }
}
