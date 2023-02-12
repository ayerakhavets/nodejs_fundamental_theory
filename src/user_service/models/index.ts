import { Sequelize } from 'sequelize';
import config from '../config';
import initGroupModel from './group';
import initUserModel from './user';

export const sequelize = new Sequelize(config.databaseUrl);

export const Group = initGroupModel(sequelize);
export const User = initUserModel(sequelize);
