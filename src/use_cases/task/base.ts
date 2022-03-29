import UserRepo from "../../repositories/user.repo";
import Validator from "simple-validator-node";

class Base {

  protected readonly user = new UserRepo();
  protected readonly validator = new Validator();
  
}

export default Base;