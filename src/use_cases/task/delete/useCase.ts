import exception from "../../../utils/exception";
import Base from "../base";

class DeleteTaskUseCase extends Base {

  public async deleteOne(user:any, index:number, listName:string) {
    const updatedList = [];
    let count = 0;
    for(let i = 0; i < user.tasks.length; i++) {
      if(user.tasks[i].listName === listName) {
        if(count !== index) updatedList.push(user.tasks[i]); 
        count++;
      }
      else updatedList.push(user.tasks[i]);
    }
    return await this.user.deleteTask(user, updatedList);
  }
}

export default DeleteTaskUseCase;