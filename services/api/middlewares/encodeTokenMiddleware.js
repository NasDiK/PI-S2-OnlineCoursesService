const jwt = require('jsonwebtoken');
const {accessTokenKey: secretKey} = require('../config');
const {getUserPermissions} = require('../core');

/**
 * С фронта через апи к нам прилетает JWT Токен, этот пайплайн начиняет запрос...
 * Декодом токена.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = (req, res, next) => {
  const {token} = req.body; //access token
  const {id: {id}} = jwt.verify(token, secretKey);

  getUserPermissions(id).then((result) => {
    req.body.userId = id;
    req.body.userRoles = result;
    next();
  });
};