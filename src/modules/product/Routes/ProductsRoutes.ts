import { Router } from 'express';
import ProductsControllers from '../controllers/ProductsControllers';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRoute = Router();
const productsController = new ProductsControllers();

productsRoute.get('/', productsController.index);

productsRoute.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productsController.show,
);

productsRoute.post(
  '/',
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
productsRoute.put(
  '/:id',
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

productsRoute.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productsController.delete,
);

export default productsRoute;
