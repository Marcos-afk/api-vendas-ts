import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionService from '../../../services/CreateSessionService';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = container.resolve(CreateSessionService);
    const user = await createSession.execute({ email, password });
    return res.json(classToClass(user));
  }
}
