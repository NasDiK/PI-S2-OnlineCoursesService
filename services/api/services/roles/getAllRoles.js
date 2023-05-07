const {logger} = require('../../core');
const getAllRoles = (knex) => {
  try {

    const roles = knex('roles')
      .select('id', 'name', 'title');

    return roles;
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getAllRoles
};