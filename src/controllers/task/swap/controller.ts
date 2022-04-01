import SwapTaskFromListsUseCase from '../../../use_cases/task/swap/useCase';
import { verifyIfIsAnInternalException } from '../../../utils/exception';
import authUser from '../../../middlewares/authUser';
import express from 'express';

const route = express.Router();
const task = new SwapTaskFromListsUseCase();

route.put('/swap/:index', authUser ,async (req:any, res) => {
  try {
    const { index } = req.params;
    const { oldList, newList } = req.body;
    await task.swapFromList(
      req.user,
      parseInt(index),
      oldList,
      newList
    );
    res.status(200).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;