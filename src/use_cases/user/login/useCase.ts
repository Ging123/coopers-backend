import exception from "../../../utils/exception";
import Base from "../../base";

class LoginUseCase extends Base {

  public async login(username:string, password:string) {
    const user = await this.getUser(username);
    await this.verifyIfPasswordMatch(password, user.password);
    const token = await this.user.login(user);
    return this.userData(user, token);
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


  private userData(user:any, token:string) {
    return {
      username:user.username,
      tasks:user.tasks,
      token:token
    }
  }
}

export default LoginUseCase;