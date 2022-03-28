import Base from "../../base";

class LogoutUserUseCase extends Base {

  public async logout(user:any) {
    user.token = '';
    await user.save();
  }
}

export default LogoutUserUseCase;