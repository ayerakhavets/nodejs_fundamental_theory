import { DataTypes, Model, InferAttributes } from 'sequelize';
import { sequelize } from '../services/database';
import { attributes } from './constants';

interface IUserInstance extends Model<InferAttributes<IUserInstance>, IUserInstance> {
  id: number;
  age: string;
  login: string;
  password: string;
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
  getGroups: () => Promise<any>;
  removeGroup: (group) => void;
}

// Model attributes
const userSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  age: DataTypes.INTEGER,
  login: { type: DataTypes.STRING, allowNull: false },
  password: DataTypes.STRING,
  created_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

// A model is an abstraction that represents a table in the database.
// Paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
export const User = sequelize.define<IUserInstance>('users', userSchema, {
  paranoid: true,
  deletedAt: 'deleted_at',
  ...attributes,
});

User.beforeDestroy((user: IUserInstance) => {
  user.getGroups().then((groups) => {
    groups.forEach((group) => {
      user.removeGroup(group);
    });
  });
});
