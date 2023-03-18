import { Router } from 'express';
import middlewares from '../middlewares';
import user from '../controllers/user';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.use(middlewares.checkAuthentication);

  route.get('/', user.getUsers);

  route.get('/:id', user.getUserById);

  route.post('/:id', [
    middlewares.userBodyValidator,
    middlewares.passwordValidator,
    user.createUser,
  ]);

  route.delete('/:id', user.deleteUser);

  route.get('/sorted/login', user.getUsersSortedByLogin);
};
