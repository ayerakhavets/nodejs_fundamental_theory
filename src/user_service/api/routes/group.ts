import { Router } from 'express';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group';
import { databaseService } from '../../services/database';
import { GroupController } from '../controllers/group';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  const groupService = new GroupService(User, Group, databaseService);
  const groupController = new GroupController(groupService);

  app.use('/groups', route);

  route.use(middlewares.checkAuthentication);

  route.get('/', groupController.getGroups);

  route.get('/:id', groupController.getGroupById);

  route.post('/:id', [middlewares.groupBodyValidator, groupController.createGroup]);

  route.delete('/:id', groupController.deleteGroup);

  route.post('/user-group/:groupId', groupController.addUserToGroup);
};
