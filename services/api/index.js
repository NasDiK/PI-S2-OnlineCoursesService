/* eslint-disable no-console */
const express = require('express');
const {usersRouter, tasksRouter} = require('./routers');
const cors = require('cors');
const _PORT = 3001;
const app = express();

//TODO:Pipeline -  проверка токена авторизации
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.listen(_PORT, () => {
  console.log(`Server started on port ${_PORT}`);
});