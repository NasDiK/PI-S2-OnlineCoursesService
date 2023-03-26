const jwt = require('jsonwebtoken');
const secret = require('../config');

module.exports = (req, res, next) => {
  const {token} = req.headers;
  const {refreshtoken} = req.headers;

  try {
    jwt.verify(token, secret.accessTokenKey);
  } catch(_) {
    try {
      const {id: {id: userId}, roleid: roleIds} = jwt.verify(refreshtoken, secret.refreshTokenKey);

      const payload = {
        userId,
        roleIds
      };

      const tokenNew = jwt.sign(payload, secret.accessTokenKey, {expiresIn: 10 * 60});

      res.setHeader('token', tokenNew);
      req.headers.token = tokenNew;

    } catch(__) {

      return res.status(401).json({message: 'Unauthorized'});
    }
  }
  next();
};

