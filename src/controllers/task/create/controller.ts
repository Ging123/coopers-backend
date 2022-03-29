import { verifyIfIsAnInternalException } from '../../../utils/exception';
import CreateTaskUseCase from '../../../use_cases/task/create/useCase';
import authUser from '../../../middlewares/authUser';
import express from 'express';

const route = express.Router();
const task = new CreateTaskUseCase();

route.post('/', authUser ,async (req:any, res) => {
  try {
    const { text, listName } = req.body;
    await task.create(req.user, text, listName);
    res.status(201).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;