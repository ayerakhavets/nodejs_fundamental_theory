import { DataTypes, Model, InferAttributes } from 'sequelize';
import { sequelize } from '../services/database';
import { attributes } from './constants';

export interface IUser extends Model<InferAttributes<IUser>, IUser> {
  id: number;
  getGroups: () => Promise<any>;
  removeGroup: (user) => void;
}

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
export const User = sequelize.define('users', userSchema, { paranoid: true, deletedAt: 'deleted_at', ...attributes });

User.beforeDestroy((user: IUser) => {
  user.getGroups().then((groups) => {
    groups.forEach((group) => {
      user.removeGroup(group);
    });
  });
});
