const jwt = require('jsonwebtoken');
const {accessTokenKey} = require('./config');

module.exports = function(req, res, next) {
  const token = req.headers.authorization ?
    req.headers.authorization.split(' ')[1] :
    '';

  // eslint-disable-next-line no-console
  console.log(req.headers);
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    if (!token) {
      return res.status(403).json({message: 'Пользователь не авторизован'});
    }
    const decodedData = jwt.verify(token, accessTokenKey);

    req.user = decodedData;
    next();
  } catch(exception) {
    return res.status(401).json({message: 'Пользователь не авторизован'});
  }
};