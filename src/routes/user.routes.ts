import express from 'express';

const route = express.Router();
const create = require('../controllers/user/create/controller');
const login = require('../controllers/user/login/controller');
const logout = require('../controllers/user/logout/controller');
const get = require('../controllers/user/get/controller');

route.use(create);
route.use(login);
route.use(logout);
route.use(get);

module.exports = route;