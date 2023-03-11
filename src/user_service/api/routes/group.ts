import { Router, Request, Response, NextFunction } from 'express';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { databaseService } from '../../services/database';
import { GroupService } from '../../services/group';
import { GROUP_DELETED, GROUP_NOT_FOUND, GROUP_UPDATED } from '../constants';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  const groupService = new GroupService(User, Group, databaseService);

  app.use('/groups', route);

  route.get('/', async (_: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await groupService.getGroups();
      res.send(groups);
    } catch (error) {
      next(error);
    }
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await groupService.getGroupById(req.params.id);
      if (group) {
        res.send(group);
      } else {
        res.status(404).send(GROUP_NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  });

  route.post('/:id', [
    middlewares.groupBodyValidator,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await groupService.createGroup(req.params.id, req.body);
        res.status(200).send(GROUP_UPDATED);
      } catch (error) {
        next(error);
      }
    },
  ]);

  route.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isDeleted = await groupService.deleteGroup(req.params.id);
      if (isDeleted) {
        res.status(200).send(GROUP_DELETED);
      } else {
        res.status(404).send(GROUP_NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  });

  route.post('/user-group/:groupId', async (req: Request, res: Response) => {
    try {
      await groupService.addUsersToGroup(req.params.groupId, req.body.userIds);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
};
