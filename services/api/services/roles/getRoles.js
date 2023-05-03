const {logger} = require('../../core');
const getRoles = (knex) => {
  try {

    const roles = knex('roles')
      .select('id', 'name');

    return roles;
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getRoles
};