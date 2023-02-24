const {AuthUser} = require('../services/users');

const authUser = (body, ext) =>
  AuthUser(body, ext);

module.exports = {
  authUser
};