/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const {logger} = require('../../core');
const bcrypt = require('bcrypt');

/**
 * @param {import('knex').Knex} knex
 * @param {{
 *  body: {
 *    targetUserId: number
 *    fields: {}
 * }
 * }} req
 */
const setUserInfo = async(knex, req) => {
  try {
    const {targetUserId, fields} = req.body;

    if (fields.password) {
      fields.password = bcrypt.hashSync(fields.password, 7);
    }

    const result = await knex('users')
      .where('id', targetUserId)
      .update(fields)
      .returning(Object.keys(fields));

    return result;

  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  setUserInfo
};