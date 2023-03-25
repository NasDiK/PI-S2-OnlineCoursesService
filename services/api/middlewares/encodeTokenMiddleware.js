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
  const {token} = req.headers;
  const {id: {id: userId}, roleId: roleIds} = jwt.verify(token, secretKey);

  req.headers.userId = userId;
  req.headers.userRoles = roleIds;

  next();
};