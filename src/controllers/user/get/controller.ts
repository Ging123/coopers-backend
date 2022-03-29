import { verifyIfIsAnInternalException } from '../../../utils/exception';
import authUser from '../../../middlewares/authUser';
import express from 'express';

const route = express.Router();

route.get('/', authUser, async (req:any, res) => {
  try {
    res.status(200).send({
      username:req.user.username,
      tasks:req.user.tasks
    });
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route;