const {AuthUser} = require('../services/users');
const {logger} = require('../core');
const config = require('../knexfile');
const knex = require('knex')(config.development);

const authUser = (body, ext) =>
  AuthUser(body, ext);

const getUsersByRole = async(req, res) => {
  try {
    const {roleId} = req.body;

    const users = await knex('users')
      .leftJoin('users_roles', 'users.id', '=', 'users_roles.user_id')
      .where('role_id', roleId)
      .select('users.id', 'users.nickname', 'users.fullname');

    return res.status(200).json({users});
  } catch(exception) {
    logger.error(exception);
    res.status(400).json({message: exception});
  }
};

module.exports = {
  authUser,
  getUsersByRole
};