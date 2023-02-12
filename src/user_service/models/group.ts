import { Sequelize, DataTypes } from 'sequelize';
import { attributes } from './constants';

const groupSchema = {
  name: DataTypes.INTEGER,
  permissions: DataTypes.ARRAY(DataTypes.STRING),
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

export default (sequelize: Sequelize) => sequelize.define('groups', groupSchema, attributes);
