const jwt = require('jsonwebtoken');
const {accessTokenKey: secretKey} = require('../config');

/**
 * С фронта через апи к нам прилетает JWT Токен, этот пайплайн начиняет запрос...
 * Декодом токена.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = (req, res, next) => {
  const {token} = req.headers; //access token

  const test = jwt.verify(token, secretKey);

  req.headers.userId = test.userId;
  req.headers.userRoles = test.roleIds;

  next();
};