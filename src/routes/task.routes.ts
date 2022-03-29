import express from 'express';

const route = express.Router();
const create = require('../controllers/task/create/controller');
const deleteAll = require("../controllers/task/delete_all/controller");
const deleteOne = require("../controllers/task/delete/controller");
const edit = require("../controllers/task/edit/controller");

route.use(create);
route.use(deleteAll);
route.use(deleteOne)
route.use(edit);

module.exports = route;