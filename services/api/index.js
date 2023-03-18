/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const {authRouter} = require('./routers');
const _PORT = 3001;
const app = express();

//TODO:Pipeline -  проверка токена авторизации
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRouter);

app.listen(_PORT, () => {
  console.log(`Server started on port ${_PORT}`);
});