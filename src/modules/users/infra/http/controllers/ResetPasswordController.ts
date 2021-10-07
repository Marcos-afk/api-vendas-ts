import { Request, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';

export default class ResetPasswordController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const sendForgotPassowrd = new ResetPasswordService();

    await sendForgotPassowrd.execute({ token, password });

    return res.status(204).json();
  }
}
