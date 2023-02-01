import { Sequelize, DataTypes } from 'sequelize';

const userSchema = {
  // Model attributes
  age: DataTypes.INTEGER,
  is_deleted: DataTypes.BOOLEAN,
  login: { type: DataTypes.STRING, allowNull: false },
  password: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}

const userAttributes = {
  // Make createdAt to actually be called created_at
  createdAt: 'created_at',
  // Make updatedAt to actually be called updated_at
  updatedAt: 'updated_at',
}

let usersModel;

// A model is an abstraction that represents a table in your database
export function initModel(sequelize: Sequelize) {
  usersModel = sequelize.define('users', userSchema, userAttributes);

  return usersModel;
}

export const getModel = () => usersModel;
