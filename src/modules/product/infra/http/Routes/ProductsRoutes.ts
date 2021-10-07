import { Router } from 'express';
import ProductsControllers from '../controllers/ProductsControllers';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '@shared/infra/http/middlewares/isAuth';
const productsRouter = Router();
const productsController = new ProductsControllers();

productsRouter.get('/', isAuth, productsController.index);

productsRouter.get(
  '/:id',
  isAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productsController.show,
);

productsRouter.post(
  '/',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      amount: Joi.number().required(),
      description: Joi.string().required(),
    },
  }),
  productsController.create,
);
productsRouter.put(
  '/:id',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      amount: Joi.number().required(),
      description: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  isAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productsController.delete,
);

export default productsRouter;
