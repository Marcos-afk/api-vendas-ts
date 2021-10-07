import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '../../../../../shared/infra/http/middlewares/isAuth';
import ProfileController from '../controllers/ProfileController';

const ProfileRouter = Router();
const profileController = new ProfileController();

ProfileRouter.get('/', isAuth, profileController.getBy);
ProfileRouter.put(
  '/',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      oldPassword: Joi.string(),
      newPassword: Joi.string().optional(),
      password_confirm: Joi.string()
        .valid(Joi.ref('newPassword'))
        .when('newPassword', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);

export default ProfileRouter;
