import { DataTypes, Model, InferAttributes } from 'sequelize';
import { sequelize } from '../services/database';
import { attributes } from './constants';

export interface IGroupInstance extends Model<InferAttributes<IGroupInstance>, IGroupInstance> {
  id: number;
  name: string;
  permissions: Array<String>;
  getUsers: () => Promise<any>;
  removeUser: (user) => void;
}

const groupSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  permissions: DataTypes.ARRAY(DataTypes.STRING),
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

export const Group = sequelize.define<IGroupInstance>('groups', groupSchema, attributes);

Group.beforeDestroy((group: IGroupInstance) => {
  group.getUsers().then((users) => {
    users.forEach((user) => {
      group.removeUser(user);
    });
  });
});
