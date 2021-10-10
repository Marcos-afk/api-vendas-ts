import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersControllers from '../controllers/OrdersController';
import isAuth from '@shared/infra/http/middlewares/isAuth';

const ordersRouter = Router();
const ordersController = new OrdersControllers();

ordersRouter.get('/', isAuth, ordersController.get);

ordersRouter.get(
  '/:id',
  isAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);
export default ordersRouter;
