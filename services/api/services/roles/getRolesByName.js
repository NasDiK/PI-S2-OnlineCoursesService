const {logger} = require('../../core');
const getRolesByName = (knex, req) => {
  try {
    const {roleName} = req.body;

    const roles = knex('roles')
      .where('name', roleName)
      .select('id', 'name');

    return roles;
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getRolesByName
};