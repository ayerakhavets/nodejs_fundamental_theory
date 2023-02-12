import { Transaction } from 'sequelize';

export class GroupService {
  constructor(private User, private Group, private databaseService) {}

  public async addUsersToGroup(groupId: string, userIds) {
    return this.databaseService.transaction(async (transaction: Transaction) => {
      const group = await this.Group.findByPk(groupId, { transaction });

      if (!group) {
        throw new Error(`Group with id ${groupId} not found`);
      }

      const users = await this.User.findAll({
        where: { id: userIds },
        transaction,
      });
      if (users.length !== userIds.length) {
        throw new Error('Some users were not found');
      }

      await group.addUsers(users, { transaction });
    });
  }

  public async createGroup(id: string, group) {
    const [, created] = await this.Group.findOrCreate({
      where: { id },
      defaults: group,
    });

    if (!created) {
      await this.Group.update(group, { where: { id } });
    }
  }

  public async deleteGroup(id: string): Promise<boolean> {
    return this.Group.destroy({ where: { id } });
  }

  public async getGroupById(id: string) {
    return this.Group.findOne({ where: { id } });
  }

  public async getGroups() {
    return this.Group.findAll();
  }
}
