import { user } from "../../../models/user.model";
import exception from "../../../utils/exception";
import Base from "../../base";

class CreateUserUseCase extends Base {

  public async create(userData:user) {
    await this.validate(userData);
    await this.encryptPassword(userData);
    await this.user.create(userData);
  }


  //VALIDATE USER DATA
  private async validate(userData:user) {
    this.validateUsername(userData.username);
    this.validatePassword(userData.password);
    await this.verifyIfUsernameAlreadyExists(userData.username);
  }

  
  private validateUsername(username:string) {
    if(!username) throw exception('Empty username');
    const greaterThanAllowed = this.validator.isGreaterThanMaxLength(username, 30);
    if(greaterThanAllowed) throw exception('Username must have less than 30 characteres');
  }


  private validatePassword(password:string) {
    if(!password) throw exception('Empty password');
    const greaterThanAllowed = this.validator.isGreaterThanMaxLength(password, 30);
    const shorterThanAllowed = this.validator.isShorterThanMinLength(password, 7);
    
    if(greaterThanAllowed) throw exception('Password must have less than 30 characteres');
    if(shorterThanAllowed) throw exception('Password must have atleast 7 characteres');
  }


  private async verifyIfUsernameAlreadyExists(username:string) {
    const usernameAlreadyExist = await this.user.findByUsername(username);
    if(usernameAlreadyExist) throw exception('This username is already being used');
  }


  //ENCRYPT PASSWOR
  private async encryptPassword(userData:user) {
    const salt = process.env.PASSWORD_SALT!;
    const hashedPassword = await this.bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
  }
}

export default CreateUserUseCase;