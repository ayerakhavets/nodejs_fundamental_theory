import { Sequelize } from 'sequelize';
import config from '../config';

export const sequelize = new Sequelize(config.databaseUrl);

class DatabaseService {
  async transaction(cb) {
    return sequelize.transaction(cb);
  }
}

export const databaseService = new DatabaseService();
