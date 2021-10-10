import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUsersService from '../../../services/ListUsersService';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);
    const users = await listUsers.execute();
    return res.json(classToClass(users));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });
    return res.json(classToClass(user));
  }
}
