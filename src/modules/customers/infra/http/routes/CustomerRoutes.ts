import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomerController from '../controllers/CustomerController';
import isAuth from '@shared/infra/http/middlewares/isAuth';
const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get('/', isAuth, customerController.index);

customerRouter.get(
  '/:id',
  isAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  customerController.show,
);

customerRouter.post(
  '/',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  customerController.create,
);
customerRouter.put(
  '/:id',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  customerController.update,
);

customerRouter.delete(
  '/:id',
  isAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  customerController.delete,
);

export default customerRouter;
