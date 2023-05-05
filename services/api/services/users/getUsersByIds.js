const {logger} = require('../../core');
const getUsersByIds = (knex, req) => {
  try {
    const {usersIds} = req.body;

    return knex('users')
      .whereIn('id', usersIds)
      .select('fullname', 'id');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getUsersByIds
};