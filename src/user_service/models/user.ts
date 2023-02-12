import { Sequelize, DataTypes } from 'sequelize';
import { attributes } from './constants';

const userSchema = {
  // Model attributes
  age: DataTypes.INTEGER,
  login: { type: DataTypes.STRING, allowNull: false },
  password: DataTypes.STRING,
  created_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

// A model is an abstraction that represents a table in your database.
// Paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
export default (sequelize: Sequelize) =>
  sequelize.define('users', userSchema, { paranoid: true, deletedAt: 'deleted_at', ...attributes });
