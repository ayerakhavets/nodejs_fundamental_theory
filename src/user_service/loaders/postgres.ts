import { Group } from '../models/group';
import { User } from '../models/user';
import { UserGroup } from '../models/userGroup';
import { sequelize } from '../services/database';

// The `belongsToMany` method creates the `UserGroup` intermediary table
// that represents the relationship between the `User` and `Group` tables.
// The `through` option specifies the name of the intermediary table.
Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });

export default async () => {
  try {
    await sequelize.authenticate();
    console.log('✌️ DB loaded and connected');

    await sequelize.sync();
    console.log('✌️ Tables created successfully');

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);

    return null;
  }
};
