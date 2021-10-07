import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAuth from '../../../../../shared/infra/http/middlewares/isAuth';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.get('/', isAuth, usersController.index);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuth,
  upload.single('avatar'),
  usersAvatarController.update,
);
export default usersRouter;
