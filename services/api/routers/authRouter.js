const express = require('express');
const authRouter = express.Router();
const controller = require('../controllers/authController');
const {check} = require('express-validator');

authRouter.post('/registration', [
  check('username', 'Имя пользователя не может быть пустым и должно быть длиннее 3 символов')
    .notEmpty()
    .isLength({min: 3}),
  check('password', 'Пароль не может быть пустым, должен быть длиннее 3 символов и не более 10')
    .notEmpty()
    .isLength({min: 3, max: 10})
], controller.registration);
authRouter.post('/auth', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.post('/check', controller.check);

module.exports = authRouter;