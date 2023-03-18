import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { BAD_REQUEST, USER_DELETED, USER_NOT_FOUND, USER_UPDATED } from '../constants';

const userService = new UserService(User);

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id) {
      await userService.createUser(req.params.id, req.body);
      res.status(201).json(USER_UPDATED);
    } else {
      res.status(400).json(BAD_REQUEST);
    }
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction)  {
  try {
    const isDeleted = await userService.deleteUser(req.params.id);
    if (isDeleted) {
      res.status(200).json(USER_DELETED);
    } else {
      res.status(404).json(USER_NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json(USER_NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function getUsersSortedByLogin(req: Request, res: Response, next: NextFunction)  {
  try {
    const { limit, loginSubString } = req.query;
    if (limit && loginSubString) {
      const users = await userService.getUsersByLogin(limit, loginSubString);
      res.status(200).json(users);
    } else {
      res.status(400).json(BAD_REQUEST);
    }
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  getUsersSortedByLogin,
};