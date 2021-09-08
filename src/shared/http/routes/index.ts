/*Declaração de variáveis */
import productsRoute from '@modules/product/Routes/ProductsRoutes';
import PasswordRouter from '@modules/users/Routes/PasswordRoutes';
import sessionsRouter from '@modules/users/Routes/SessionRoutes';
import usersRouter from '@modules/users/Routes/UserRoutes';
import { Router } from 'express';

const Routes = Router();

Routes.use('/produtos', productsRoute);
Routes.use('/usuarios', usersRouter);
Routes.use('/sessoes', sessionsRouter);
Routes.use('/password', PasswordRouter);

export default Routes;
