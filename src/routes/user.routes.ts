import express from 'express';

const route = express.Router();
const create = require('../controllers/user/create/controller');
const login = require('../controllers/user/login/controller');
const logout = require('../controllers/user/logout/controller');

route.use(create);
route.use(login);
route.use(logout);

module.exports = route;