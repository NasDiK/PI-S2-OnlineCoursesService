/* eslint-disable no-console */
const express = require('express');
const {
  usersRouter,
  tasksRouter,
  authRouter,
  coursesRouter,
  reviewsRoutes,
  groupsRouter, rolesRouter
} = require('./routers');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleWare');
const encodeTokenMiddleware = require('./middlewares/encodeTokenMiddleware');
const {logger} = require('./core');
const _PORT = 3001;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

try {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use(authMiddleware);
  app.use(encodeTokenMiddleware);
  app.use('/users', usersRouter);
  app.use('/tasks', tasksRouter);
  app.use('/courses', coursesRouter);
  app.use('/reviews', reviewsRoutes);
  app.use('/groups', groupsRouter);
  app.use('/roles', rolesRouter);
} catch(err) {
  logger.error(err);
}

app.listen(_PORT, () => {
  console.log(`Server started on port ${_PORT}`);
});