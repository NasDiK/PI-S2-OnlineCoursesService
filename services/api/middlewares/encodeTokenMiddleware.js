const jwt = require('jsonwebtoken');
const {accessTokenKey: secretKey} = require('../config');
// const {getUserPermissions} = require('../core');

/**
 * С фронта через апи к нам прилетает JWT Токен, этот пайплайн начиняет запрос...
 * Декодом токена.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = (req, res, next) => {
  const {token} = req.headers; //access token
  const {userId} = jwt.verify(token, secretKey);

  req.headers.userId = userId;

  // getUserPermissions(userId).then((result) => {
  //   req.headers.userRoles = result;
  //   next();
  // });
  next();
};