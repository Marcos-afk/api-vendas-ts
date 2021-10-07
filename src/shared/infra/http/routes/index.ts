/*Declaração de variáveis */
import customerRouter from '@modules/customers/infra/http/routes/CustomerRoutes';
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRouter';
import productsRouter from '@modules/product/infra/http/Routes/ProductsRoutes';
import PasswordRouter from '@modules/users/infra/http/Routes/PasswordRoutes';
import ProfileRouter from '@modules/users/infra/http/Routes/ProfileRoutes';
import sessionsRouter from '@modules/users/infra/http/Routes/SessionRoutes';
import usersRouter from '@modules/users/infra/http/Routes/UserRoutes';
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
