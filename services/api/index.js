/* eslint-disable no-console */
const express = require('express');
const {usersRouter, tasksRouter, authRouter} = require('./routers');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleWare');
const _PORT = 3001;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/users',usersRouter);
app.use('/tasks', tasksRouter);

app.listen(_PORT, () => {
  console.log(`Server started on port ${_PORT}`);
});