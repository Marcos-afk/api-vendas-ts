import { Request, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';
import { container } from 'tsyringe';

export default class ResetPasswordController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const sendForgotPassowrd = container.resolve(ResetPasswordService);

    await sendForgotPassowrd.execute({ token, password });

    return res.status(204).json({ message: 'Senha alterada com sucesso!' });
  }
}
