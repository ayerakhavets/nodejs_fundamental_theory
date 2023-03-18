import { Router } from 'express';
import { UserController } from '../controllers/user';
import { UserService } from '../../services/user';
import { User } from '../../models/user';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  const userService = new UserService(User);
  const userController = new UserController(userService);

  app.use('/users', route);

  route.use(middlewares.checkAuthentication);

  route.get('/', userController.getUsers);

  route.get('/:id', userController.getUserById);

  route.post('/:id', [middlewares.userBodyValidator, middlewares.passwordValidator, userController.createUser]);

  route.delete('/:id', userController.deleteUser);

  route.get('/sorted/login', userController.getUsersSortedByLogin);
};
