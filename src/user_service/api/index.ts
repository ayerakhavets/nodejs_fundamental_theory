import { Router } from 'express';
import user from './routes/users';

export default () => {
	const app = Router();
	user(app);

	return app;
}