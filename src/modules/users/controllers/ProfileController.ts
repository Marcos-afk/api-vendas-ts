import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { classToClass } from 'class-transformer';
export default class ProfileController {
  public async getBy(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfile = new ShowProfileService();
    const user = await showProfile.execute({ user_id });
    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { email, name, newPassword, oldPassword } = req.body;
    const updateProfile = new UpdateProfileService();
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
