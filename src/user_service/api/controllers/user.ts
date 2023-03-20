import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, USER_DELETED, USER_NOT_FOUND, USER_UPDATED } from '../constants';

export class UserController {
  constructor(private UserService) {}

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.params.id) {
        await this.UserService.createUser(req.params.id, req.body);
        res.status(201).json(USER_UPDATED);
      } else {
        res.status(400).json(BAD_REQUEST);
      }
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const isDeleted = await this.UserService.deleteUser(req.params.id);
      if (isDeleted) {
        res.status(200).json(USER_DELETED);
      } else {
        res.status(404).json(USER_NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.UserService.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json(USER_NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.UserService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  public async getUsersSortedByLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, loginSubString } = req.query;
      if (limit && loginSubString) {
        const users = await this.UserService.getUsersByLogin(limit, loginSubString);
        res.status(200).json(users);
      } else {
        res.status(400).json(BAD_REQUEST);
      }
    } catch (error) {
      next(error);
    }
  }
}
