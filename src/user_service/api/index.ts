import { Router } from 'express';
import group from './routes/group';
import user from './routes/user';

export default () => {
  const app = Router();
  user(app);
  group(app);

  return app;
};
