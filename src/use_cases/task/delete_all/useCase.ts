import Base from "../base";

class DeleteAllTasksUseCase extends Base {

  public async deleteAll(user:any) {
    await this.user.deleteAllTasks(user);
  }
}

export default DeleteAllTasksUseCase;