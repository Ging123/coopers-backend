import exception from "../../../utils/exception";
import Base from "../base";

class DeleteTaskUseCase extends Base {

  public async deleteOne(user:any, index:number) {
    if(!index && index !== 0) throw exception("Task doesn't exists");
    return await this.user.deleteTask(user, index);
  }
}

export default DeleteTaskUseCase;