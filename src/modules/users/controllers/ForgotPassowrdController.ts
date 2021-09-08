import { Request, Response } from 'express';
import SendForgotPasswordService from '../services/SendForgotPasswordService';

export default class ForgotPassowrdController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPassowrd = new SendForgotPasswordService();

    await sendForgotPassowrd.execute({ email });

    return res.status(204).json();
  }
}
