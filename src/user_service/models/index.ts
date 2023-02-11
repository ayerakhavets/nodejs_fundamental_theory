import { Sequelize } from 'sequelize';
import config from '../config';
import initUserModel from './users';

export const sequelize = new Sequelize(config.databaseUrl);

export const User =  initUserModel(sequelize);
