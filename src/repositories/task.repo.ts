import TaskModel from "../models/task.model";

class TaskRepo extends TaskModel {

  public async create(owner:string) {
    const listOfTasks = this.createListOfTasks(owner);
    await listOfTasks.save();
    return listOfTasks;
  }


  public async findByOwner(owner:string) {
    return await this.taskModel.findOne({ owner:owner });
  }


  public async deleteByOwner(owner:string) {
    return await this.taskModel.deleteOne({ owner:owner });
  }
}

export default TaskRepo;