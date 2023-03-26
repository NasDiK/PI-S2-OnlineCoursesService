const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = (req, res, next) => {
  const {token: accessToken, refreshtoken} = req.headers;

  try {
    jwt.verify(accessToken, config.accessTokenKey);
  } catch(_) {
    try {
      const {id: {id: userId}, roleid: roleIds} = jwt.verify(refreshtoken, config.refreshTokenKey);

      const payload = {
        userId,
        roleIds
      };

      const tokenNew = jwt.sign(
        payload, config.accessTokenKey, {expiresIn: config.tokensExpiresTime.access}
      ); //new AccessToken

      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
      res.header('Access-Control-Expose-Headers', 'x-auth-token');
      res.setHeader('x-auth-token', tokenNew);
      req.headers.token = tokenNew;

    } catch(__) {

      return res.status(401).json({message: 'Unauthorized'});
    }
  }
  next();
};

