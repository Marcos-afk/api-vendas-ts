import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import dotenv from 'dotenv';
import Routes from '../http/routes/index';
import ErrorApp from '@shared/errors/ErrorApp';
import '@shared/typeorm';
import uploadsConfig from '@config/upload';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(pagination);
app.use('/files', express.static(uploadsConfig.directory));

app.use('/api', Routes);

app.use(errors());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorApp) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err.message);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor Rodando, url: http://localhost:${PORT}`);
});
