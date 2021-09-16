/*Declaração de variáveis */
import customerRouter from '@modules/customers/routes/CustomerRoutes';
import ordersRouter from '@modules/orders/routes/OrdersRouter';
import productsRouter from '@modules/product/Routes/ProductsRoutes';
import PasswordRouter from '@modules/users/Routes/PasswordRoutes';
import ProfileRouter from '@modules/users/Routes/ProfileRoutes';
import sessionsRouter from '@modules/users/Routes/SessionRoutes';
import usersRouter from '@modules/users/Routes/UserRoutes';
import { Router } from 'express';

const Routes = Router();

Routes.use('/products', productsRouter);
Routes.use('/users', usersRouter);
Routes.use('/sessions', sessionsRouter);
Routes.use('/password', PasswordRouter);
Routes.use('/profile', ProfileRouter);
Routes.use('/customers', customerRouter);
Routes.use('/orders', ordersRouter);

export default Routes;
