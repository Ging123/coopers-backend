import { verifyIfIsAnInternalException } from '../../../utils/exception';
import LogoutUserUseCase from '../../../use_cases/user/logout/useCase';
import authUser from '../../../middlewares/authUser';
import express from 'express';

const route = express.Router();
const user = new LogoutUserUseCase();

route.delete('/logout', authUser, async (req:any, res) => {
  try {
    await user.logout(req.user);
    res.status(204).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;