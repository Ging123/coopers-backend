import DeleteAllTasksUseCase from '../../../use_cases/task/delete_all/useCase';
import { verifyIfIsAnInternalException } from '../../../utils/exception';
import authUser from '../../../middlewares/authUser';
import express from 'express';

const route = express.Router();
const task = new DeleteAllTasksUseCase();

route.delete('/', authUser ,async (req:any, res) => {
  try {
    await task.deleteAll(req.user);
    res.status(204).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;