import { Sequelize } from 'sequelize';
import config from '../config';

export default async () => {
  try {
    const sequelize = new Sequelize(config.databaseUrl);
    await sequelize.authenticate();
    console.log('✌️ DB loaded and connected');

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);

    return null;
  }
};
