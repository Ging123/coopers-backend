import express from 'express';

const routes = express.Router();
const userRoutes = require('./src/routes/user.routes');
const taskRoutes = require('./src/routes/task.routes');

routes.use('/user', userRoutes);
routes.use('/task', taskRoutes);

export default routes;