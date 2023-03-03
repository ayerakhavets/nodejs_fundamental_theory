import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import { BAD_REQUEST, USER_DELETED, USER_NOT_FOUND, USER_UPDATED } from '../constants';
import { UserService } from '../../services/user';
import { User } from '../../models/user';

const route = Router();

export default (app: Router) => {
  const userService = new UserService(User);

  app.use('/users', route);

  route.get('/', async (_: Request, res: Response) => {
    try {
      const users = await userService.getUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send(USER_NOT_FOUND);
    }
  });

  route.post('/:id', [
    middlewares.validateUserBody,
    middlewares.validatePassword,
    async (req: Request, res: Response) => {
      try {
        if (req.params.id) {
          await userService.createUser(req.params.id, req.body);
          res.status(200).send(USER_UPDATED);
        } else {
          res.status(400).send(BAD_REQUEST);
        }
      } catch (error) {
        res.status(500).send(error);
      }
    },
  ]);

  route.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await userService.deleteUser(req.params.id);
    if (isDeleted) {
      res.status(200).send(USER_DELETED);
    } else {
      res.status(404).send(USER_NOT_FOUND);
    }
  });

  route.get('/sorted/login', async (req: Request, res: Response) => {
    const { limit, loginSubString } = req.query;
    if (limit && loginSubString) {
      const users = await userService.getUsersByLogin(limit, loginSubString);
      res.send(users);
    } else {
      res.status(400).send(BAD_REQUEST);
    }
  });
};
