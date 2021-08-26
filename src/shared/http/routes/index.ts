/*Declaração de variáveis */
import productsRoute from '@modules/product/Routes/ProductsRoutes';
import usersRouter from '@modules/users/Routes/UserRoutes';
import { Router } from 'express';

const Routes = Router();

Routes.use('/produtos', productsRoute);
Routes.use('/usuarios', usersRouter);

export default Routes;
