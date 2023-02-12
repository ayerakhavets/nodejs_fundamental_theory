import { Group, User } from '../models';
import { GroupService } from './group';
import { UserService } from './user';

export const groupService = new GroupService(Group);
export const userService = new UserService(User);
