const jwt = require('jsonwebtoken');
const {secret} = require('../config');

module.exports = function(req, res, next) {
  if (reg.method === 'OPTIONS') {
    next();
  }

  try {
    const token = reg.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({message: 'Пользователь не авторизован'});
    }
    const decodedData = jwt.verify(token, secret);

    reg.user = decodedData;
    next();
  } catch(exception) {
    return res.status(403).json({message: 'Пользователь не авторизован'});
  }
};