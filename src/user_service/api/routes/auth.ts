import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth';
import { INVALID_CREDENTIALS } from '../constants';

const route = Router();

export default (app: Router) => {
  const authService = new AuthService(User);

  app.use('/auth', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        return res.status(401).json({ message: INVALID_CREDENTIALS });
      }

      const token = await authService.authenticate(login, password);
      if (!token) {
        return res.status(401).json({ message: INVALID_CREDENTIALS });
      }
      res.send({ result: token });
    } catch (error) {
      next(error);
    }
  });
};
