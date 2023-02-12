import { DataTypes, Model, InferAttributes } from 'sequelize';
import { sequelize } from '../services/database';
import { attributes } from './constants';

export interface IGroup extends Model<InferAttributes<IGroup>, IGroup> {
  id: number;
  name: string;
  permissions: Array<String>;
  getUsers: () => Promise<any>;
  removeUser: (user) => void;
}

const groupSchema = {
  name: DataTypes.STRING,
  permissions: DataTypes.ARRAY(DataTypes.STRING),
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

export const Group = sequelize.define('groups', groupSchema, attributes);

Group.beforeDestroy((group: IGroup) => {
  group.getUsers().then((users) => {
    users.forEach((user) => {
      group.removeUser(user);
    });
  });
});
