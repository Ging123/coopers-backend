import GetUserByToken from "../use_cases/user/get_by_token/useCase";
import { verifyIfIsAnInternalException } from "../utils/exception";

const user = new GetUserByToken();

async function authUser(req:any, res:any, next:() => void) {
  try {
    const sentToken = req.headers["Authorization"] || req.headers["authorization"];
    req.user = await user.get(sentToken);
    next();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
}

export default authUser;