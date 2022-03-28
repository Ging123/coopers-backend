import { task } from "../../../models/task.model";
import exception from "../../../utils/exception";
import Base from "../../base";

class LoginUseCase extends Base {

  public async login(username:string, password:string) {
    const user = await this.getUser(username);
    await this.verifyIfPasswordMatch(password, user.password);
    const tasks = await this.getTasks(username);
    const token = await this.user.login(user, tasks);
    return this.userData(username, tasks, token);
  }


  private async getUser(username:string) {
    const user = await this.user.findByUsername(username);
    if(!user) throw exception("This user doesn't exists");
    return user;
  }


  private async verifyIfPasswordMatch(typedPassword:string, userPassword:string) {
    const salt = process.env.PASSWORD_SALT!;
    const match = await this.bcrypt.compare(
      typedPassword, 
      userPassword,
      salt
    );
    if(!match) throw exception("Password is wrong");
  }


  private async getTasks(owner:string):Promise<task[]> {
    const tasksData = await this.task.findByOwner(owner);
    return tasksData.tasks;
  }


  private userData(username:string, tasks:task[], token:string) {
    return {
      username:username,
      tasks:tasks,
      token:token
    }
  }
}

export default LoginUseCase;