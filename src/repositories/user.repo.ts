import UserModel, { user } from "../models/user.model";
import Bcrypt from "../externals/encrypt";
import Jwt from "../externals/jwt";
import exception from "../utils/exception";

class UserRepo extends UserModel {

  private readonly bcrypt = new Bcrypt();

  public async create(userData:user) {
    const user = this.createUser(userData);
    await user.save();
    return user;
  }


  public async login(user:any) {
    const token = await this.createLoginToken(user);
    user.token = token.hash;
    await user.save();
    return token.plain;
  }


  private async createLoginToken(user:any) {
    const jwt = new Jwt(process.env.LOGIN_JWT_SECRET!);
    const token = jwt.create({ username:user.username });
    const hashedToken = await this.encryptLoginToken(token);
    return { plain:token, hash:hashedToken };
  }


  private async encryptLoginToken(token:string) {
    const salt = process.env.LOGIN_TOKEN_SALT!;
    const hashedToken = this.bcrypt.hash(token, salt);
    return hashedToken;
  }


  public async addTask(user:any, text:string, listName:string) {
    user.tasks.push({
      text:text,
      listName:listName
    });
    await user.save();
    return user;
  }


  public async editTask(user:any, taskIndex:number, text:string, listName:string, 
  checked=false) {
    const updatedTasks = [...user.tasks];
    updatedTasks[taskIndex].text = text;
    updatedTasks[taskIndex].listName = listName;
    updatedTasks[taskIndex].checked = checked;
    await this.userModel.updateOne({ username:user.username },
    { $set:{ tasks:updatedTasks } });
  }


  public async deleteTask(user:any, taskIndex:number) {
    let updatedTask = [], removed = false;
    for(let i = 0; i < user.tasks.length; i++) {
      if(i !== taskIndex) updatedTask.push(user.tasks[i]);
      else removed = true;
    }
    if(!removed) throw exception("Task doesn't exists");
    user.tasks = updatedTask;
    await user.save();
    return user;
  }


  public async deleteAllTasks(user:any) {
    user.tasks = [];
    await user.save();
    return user;
  }
  

  public async findByUsername(username:string) {
    return await this.userModel.findOne({ username:username });
  }

  
  public async deleteByUsername(username:string) {
    return await this.userModel.deleteOne({ username:username });
  }
}

export default UserRepo;