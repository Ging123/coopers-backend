import Base from "../base";

class DeleteAllTasksUseCase extends Base {

  public async deleteAll(user:any, listName:string) {
    const updatedList = [];
    for(let i = 0; i < user.tasks.length; i++) {
      if(user.tasks[i].listName !== listName) updatedList.push(user.tasks[i]); 
    }
    await this.user.deleteAllTasks(user, updatedList);
  }
}

export default DeleteAllTasksUseCase;