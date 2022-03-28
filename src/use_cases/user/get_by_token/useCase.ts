import exception from "../../../utils/exception";
import Jwt from "../../../externals/jwt";
import Base from "../../base";

class GetUserByToken extends Base {

  public async get(token:string) {
    const tokenData = await this.getTokenData(token);
    const user = await this.user.findByUsername(tokenData.username);
    await this.verifyIfTokenExistInDb(token, user.token);
    return user;
  }


  private getTokenData(token:string) {
    const jwt = new Jwt(process.env.LOGIN_JWT_SECRET!);
    const data = jwt.validate(token);
    return data;
  }


  private async verifyIfTokenExistInDb(token:string, hashToken:string) {
    const salt = process.env.LOGIN_TOKEN_SALT!;
    const tokenMatch = await this.bcrypt.compare(token, hashToken, salt);
    if(!tokenMatch) throw exception('Expired token', 401);
  }
}

export default GetUserByToken;