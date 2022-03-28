import { verifyIfIsAnInternalException } from '../../../utils/exception';
import CreateUserUseCase from '../../../use_cases/user/create/useCase';
import express from 'express';

const route = express.Router();
const user = new CreateUserUseCase();

route.post('/', async (req, res) => {
  try {
    const userData = req.body;
    await user.create(userData);
    res.status(201).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;