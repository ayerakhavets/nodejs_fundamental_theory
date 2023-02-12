export class GroupService {
  constructor(private groupModel) {
    this.groupModel = groupModel;
  }

  public async createGroup(id: string, group) {
    const [, created] = await this.groupModel.findOrCreate({
      where: { id },
      defaults: group,
    });

    if (!created) {
      await this.groupModel.update(group, { where: { id } });
    }
  }

  public async deleteGroup(id: string): Promise<boolean> {
    return this.groupModel.destroy({ where: { id } });
  }

  public async getGroupById(id: string) {
    return this.groupModel.findOne({ where: { id } });
  }

  public async getGroups() {
    return this.groupModel.findAll();
  }
}
