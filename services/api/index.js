/* eslint-disable no-console */
const express = require('express');
const {usersRouter} = require('./routers');
const _PORT = 3001;
const app = express();

//TODO:Pipeline -  проверка токена авторизации

app.use('/users', usersRouter);

app.listen(_PORT, () => {
  console.log(`Server started on port ${_PORT}`);
});