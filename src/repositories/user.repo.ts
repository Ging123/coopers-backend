import UserModel, { user } from "../models/user.model";
import Bcrypt from "../externals/encrypt";
import Jwt from "../externals/jwt";

class UserRepo extends UserModel {

  private readonly bcrypt = new Bcrypt();

  public async create(userData:user) {
    const user = this.createUser(userData);
    await user.save();
    return user;
  }


  public async login(user:any, tasks:any[]) {
    const token = await this.createLoginToken(user, tasks);
    user.token = token.hash;
    await user.save();
    return token.plain;
  }


  private async createLoginToken(user:any, tasks:any[]) {
    const jwt = new Jwt(process.env.LOGIN_JWT_SECRET!);
    const token = jwt.create({ username:user.username, tasks:tasks });
    const hashedToken = await this.encryptLoginToken(token);
    return { plain:token, hash:hashedToken };
  }


  private async encryptLoginToken(token:string) {
    const salt = process.env.LOGIN_TOKEN_SALT!;
    const hashedToken = this.bcrypt.hash(token, salt);
    return hashedToken;
  }
  

  public async findByUsername(username:string) {
    return await this.userModel.findOne({ username:username });
  }

  
  public async deleteByUsername(username:string) {
    return await this.userModel.deleteOne({ username:username });
  }
}

export default UserRepo;