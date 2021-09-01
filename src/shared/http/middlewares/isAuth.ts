/* eslint-disable @typescript-eslint/no-unused-vars */
import ErrorApp from '@shared/errors/ErrorApp';
import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ErrorApp('Sem token');
  }

  const [type, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodeToken as ITokenPayload;

    req.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new ErrorApp('Erro : ' + error.message, 500);
  }
}
