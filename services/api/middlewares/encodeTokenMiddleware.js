/* eslint-disable max-nested-callbacks */
const jwt = require('jsonwebtoken');
const {accessTokenKey: secretKey} = require('../config');
const {getUserPermissions, getRoleEnumsMap} = require('../core');

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

  getRoleEnumsMap().then((rolesMap) => {
    getUserPermissions(id).then((result) => {
      const userRoles = result.map((curUserRoleId) => rolesMap[curUserRoleId]);

      req.body.userId = id;
      req.body.userRoles = userRoles;
      next();
    });
  });
};