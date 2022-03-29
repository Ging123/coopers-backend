import { verifyIfIsAnInternalException } from '../../../utils/exception';
import DeleteTaskUseCase from '../../../use_cases/task/delete/useCase';
import authUser from '../../../middlewares/authUser';
import express from 'express';

const route = express.Router();
const task = new DeleteTaskUseCase();

route.delete('/:index', authUser ,async (req:any, res) => {
  try {
    const { index } = req.params;
    await task.deleteOne(req.user, parseInt(index));
    res.status(204).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;