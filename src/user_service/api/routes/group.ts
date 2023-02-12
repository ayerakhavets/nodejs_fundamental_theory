import { Router, Request, Response } from 'express';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { databaseService } from '../../services/database';
import { GroupService } from '../../services/group';
import { BAD_REQUEST, GROUP_DELETED, GROUP_NOT_FOUND, GROUP_UPDATED } from '../constants';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  const groupService = new GroupService(User, Group, databaseService);

  app.use('/groups', route);

  route.get('/', async (_: Request, res: Response) => {
    const groups = await groupService.getGroups();
    res.send(groups);
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const group = await groupService.getGroupById(req.params.id);
    if (group) {
      res.send(group);
    } else {
      res.status(404).send(GROUP_NOT_FOUND);
    }
  });

  route.post('/:id', [
    middlewares.validateGroupBody,
    async (req: Request, res: Response) => {
      if (req.params.id) {
        await groupService.createGroup(req.params.id, req.body);
        res.status(200).send(GROUP_UPDATED);
      } else {
        res.status(400).send(BAD_REQUEST);
      }
    },
  ]);

  route.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await groupService.deleteGroup(req.params.id);
    if (isDeleted) {
      res.status(200).send(GROUP_DELETED);
    } else {
      res.status(404).send(GROUP_NOT_FOUND);
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