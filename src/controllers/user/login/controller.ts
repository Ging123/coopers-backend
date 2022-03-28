import { verifyIfIsAnInternalException } from '../../../utils/exception';
import LoginUseCase from '../../../use_cases/user/login/useCase';
import express from 'express';

const route = express.Router();
const user = new LoginUseCase();

route.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await user.login(username, password);
    res.status(201).json(userData);
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;