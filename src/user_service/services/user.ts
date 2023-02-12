import { Op } from 'sequelize';

export class UserService {
  constructor(private User) {}

  public async createUser(id, user) {
    const [, created] = await this.User.findOrCreate({
      where: { id },
      defaults: user,
    });

    if (!created) {
      await this.User.update(user, { where: { id } });
    }
  }

  // A soft-deletion will happen: UPDATE "posts" SET "deletedAt"=[timestamp] WHERE "deletedAt" IS NULL AND "id" = id.
  public async deleteUser(id) {
    return this.User.destroy({ where: { id } });
  }

  public async getUserById(id) {
    return this.User.findOne({ where: { id } });
  }

  public async getUsers() {
    return this.User.findAll({});
  }

  public async getUsersByLogin(limit, loginSubString) {
    return this.User.findAll({
      limit,
      order: [['login', 'DESC']],
      where: {
        login: { [Op.like]: `%${loginSubString}%` },
      },
    });
  }
}
