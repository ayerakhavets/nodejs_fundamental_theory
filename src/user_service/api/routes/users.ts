import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import { userService } from '../../services';
import { BAD_REQUEST, USER_DELETED, USER_NOT_FOUND, USER_UPDATED } from '../constants';

const route = Router();

export default (app: Router)=> {
  app.use('/users', route);

  route.get('/', async (_, res: Response) => {
    const users = await userService.getUsers();
    res.send(users);
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const user = await userService.findUserById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send(USER_NOT_FOUND);
    }
  });

  route.post('/add/:id', [
    middlewares.validateBody,
    middlewares.validatePassword,
    async (req: Request, res: Response) => {
      if (req.params.id) {
        await userService.addUser(req.params.id, req.body);
        res.status(200).send(USER_UPDATED);
      } else {
        res.status(400).send(BAD_REQUEST);
      }
    },
  ]);

  route.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await userService.softDeleteUser(req.params.id);
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
