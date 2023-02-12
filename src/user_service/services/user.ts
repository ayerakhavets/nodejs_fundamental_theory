import { Op } from 'sequelize';

export class UserService {
  constructor(private userModel) {
    this.userModel = userModel;
  }

  public async createUser(id, user) {
    const [, created] = await this.userModel.findOrCreate({
      where: { id },
      defaults: user,
    });

    if (!created) {
      await this.userModel.update(user, { where: { id } });
    }
  }

  // A soft-deletion will happen: UPDATE "posts" SET "deletedAt"=[timestamp] WHERE "deletedAt" IS NULL AND "id" = id.
  public async deleteUser(id) {
    return this.userModel.destroy({ where: { id } });
  }

  public async getUserById(id) {
    const user = await this.userModel.findOne({ where: { id } });
    return user;
  }

  public async getUsers() {
    const users = await this.userModel.findAll({});
    return users;
  }

  public async getUsersByLogin(limit, loginSubString) {
    const users = await this.userModel.findAll({
      limit,
      order: [['login', 'DESC']],
      where: {
        login: { [Op.like]: `%${loginSubString}%` },
      },
    });
    return users;
  }
}
