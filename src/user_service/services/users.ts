import { Op } from "sequelize";
import { getModel } from "../models/users";

const addUser = async (id, user) => {
  const [_, created] = await getModel().findOrCreate({
    where: { id },
    defaults: user,
  });

  if (!created) {
    await await getModel().update(user, { where: { id } });
  }
}

const findUserById = async (id) => {
  const user = await getModel().findOne({ where: { id }});
  return user;
}

const getUsers = async () => {
  const users = await getModel().findAll({ where: { is_deleted: false }});
  return users;
}

const getUsersByLogin = async (limit, loginSubString) => {
  const users = await getModel().findAll({
    limit,
    order: [["login", "DESC"]],
    where: {
      login: { [Op.like]: `%${loginSubString}%` },
    },
  });
  return users;
}

const softDeleteUser = async (id) => {
  const user = await getModel().findOne({ where: { id } });
  if (user) {
    await getModel().update({ is_deleted: true }, { where: { id } });
    return true;
  }

  return false;
}

export default {
  addUser,
  findUserById,
  getUsers,
  getUsersByLogin,
  softDeleteUser,
}