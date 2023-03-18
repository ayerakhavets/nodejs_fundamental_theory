import { Request, Response, NextFunction } from 'express';
import { GROUP_DELETED, GROUP_NOT_FOUND, GROUP_UPDATED } from '../constants';

export class GroupController {
  constructor(private GroupService) {}

  public async addUserToGroup(req: Request, res: Response) {
    try {
      await this.GroupService.addUsersToGroup(req.params.groupId, req.body.userIds);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  public async createGroup(req: Request, res: Response, next: NextFunction)  {
    try {
      await this.GroupService.createGroup(req.params.id, req.body);
      res.status(200).json(GROUP_UPDATED);
    } catch (error) {
      next(error);
    }
  }

  public async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const isDeleted = await this.GroupService.deleteGroup(req.params.id);
      if (isDeleted) {
        res.status(200).json(GROUP_DELETED);
      } else {
        res.status(404).json(GROUP_NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  }

  public async getGroupById(req: Request, res: Response, next: NextFunction)  {
    try {
      const group = await this.GroupService.getGroupById(req.params.id);
      if (group) {
        res.status(200).json(group);
      } else {
        res.status(404).json(GROUP_NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  }

  public async getGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await this.GroupService.getGroups();
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  }
}
