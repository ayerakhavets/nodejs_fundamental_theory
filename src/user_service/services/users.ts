import { Op } from 'sequelize';

export class UserService {
  userModel: any;

  constructor(userModel) {
    this.userModel = userModel;
  }

  public async addUser(id, user) {
    const [, created] = await this.userModel.findOrCreate({
      where: { id },
      defaults: user,
    });

    if (!created) {
      await this.userModel.update(user, { where: { id } });
    }
  }

  public async findUserById(id) {
    const user = await this.userModel.findOne({ where: { id } });
    return user;
  }

  public async getUsers() {
    const users = await this.userModel.findAll({ where: { is_deleted: false } });
    return users;
  }

  public async getUsersByLogin(limit, loginSubString)  {
    const users = await this.userModel.findAll({
      limit,
      order: [['login', 'DESC']],
      where: {
        login: { [Op.like]: `%${loginSubString}%` },
      },
    });
    return users;
  }

  public async softDeleteUser(id)  {
    const user = await this.userModel.findOne({ where: { id } });
    if (user) {
      await this.userModel.update({ is_deleted: true }, { where: { id } });
      return true;
    }

    return false;
  }
}
