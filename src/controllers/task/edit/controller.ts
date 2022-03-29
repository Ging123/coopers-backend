import { verifyIfIsAnInternalException } from '../../../utils/exception';
import EditTaskUseCase from '../../../use_cases/task/edit/useCase';
import authUser from '../../../middlewares/authUser';
import express from 'express';

const route = express.Router();
const task = new EditTaskUseCase();

route.put('/:index', authUser ,async (req:any, res) => {
  try {
    const { index } = req.params;
    const { text, listName, checked } = req.body;
    await task.edit (
      req.user,
      parseInt(index),
      text,
      listName,
      checked 
    );
    res.status(200).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;