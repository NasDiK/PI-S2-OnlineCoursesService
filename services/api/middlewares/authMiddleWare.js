const jwt = require('jsonwebtoken');
const secret = require('../config');

module.exports = (req, res, next) => {
  const {token} = req.headers;

  try {
    jwt.verify(token, secret.accessTokenKey);
  } catch(_) {
    return res.status(401).json({message: 'Unauthorized'});
  }
  next();
};

