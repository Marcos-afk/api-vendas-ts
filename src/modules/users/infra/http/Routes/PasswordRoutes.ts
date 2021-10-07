import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPassowrdController from '../controllers/ForgotPassowrdController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const PasswordRouter = Router();
const forgotPassword = new ForgotPassowrdController();
const resetPassword = new ResetPasswordController();

PasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPassword.create,
);

PasswordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirm: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassword.update,
);

export default PasswordRouter;
