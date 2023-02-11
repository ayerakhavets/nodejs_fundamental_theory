import { User } from '../models';
import { UserService } from './users';

export const userService = new UserService(User);
