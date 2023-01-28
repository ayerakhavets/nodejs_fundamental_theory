import { Router, Request, Response } from 'express';
import middlewares from "../middlewares";
import usersService from "../../services/users";
import { BAD_REQUEST, USER_DELETED, USER_NOT_FOUND, USER_UPDATED } from "../../utils/constants";

const route = Router();

export default (app: Router)=> {
  app.use('/users', route);

  route.get("/", async (_, res: Response) => {
    const users = await usersService.getUsers();
    res.send(users);
  });

  route.get("/:id", async (req: Request, res: Response) => {
    const user = await usersService.findUserById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send(USER_NOT_FOUND)
    }
  });

  route.post("/add/:id", [
    middlewares.validateBody,
    middlewares.validatePassword,
    async (req: Request, res: Response) => {
      console.log('== ~ file: users.ts:25 ~ req.body', req.body);
      console.log('== ~ file: users.ts:25 ~ req.params', req.params);
      if (req.params.id) {
        await usersService.addUser(req.params.id, req.body);
        res.status(200).send(USER_UPDATED);
      } else {
        res.status(400).send(BAD_REQUEST)
      }
    },
  ]);

  route.delete("/:id", async (req: Request, res: Response) => {
    const isDeleted = await usersService.softDeleteUser(req.params.id);
    if (isDeleted) {
      res.status(200).send(USER_DELETED);
    } else {
      res.status(404).send(USER_NOT_FOUND);
    }
  });

  route.get("/sorted/login", async (req: Request, res: Response) => {
    const { limit, loginSubString } = req.query;
    if (limit && loginSubString) {
      const users = await usersService.getUsersByLogin(limit, loginSubString);
      res.send(users);
    } else {
      res.status(400).send(BAD_REQUEST)
    }
  });
}