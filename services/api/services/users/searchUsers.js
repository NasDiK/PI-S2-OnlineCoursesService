/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const {logger} = require('../../core');
const {array2Object, groupBy} = require('../../utils');

const searchUsers = async(knex, req) => {
  try {
    const {usersIds, appends} = req.body;

    const _model = knex('users').select(['id', 'nickname', 'fullname']);

    if (usersIds) {
      _model.whereIn('id', usersIds);
    }

    const users = await _model;
    const usersObj = array2Object(users, 'id');

    if (appends) {
      if (appends.includes('groups')) {
        const userGroupsIds = await knex('groups_users')
          .select('group_id', 'isModerator', 'user_id')
          .whereIn('user_id', usersIds);

        const groupedUserGroups = groupBy(userGroupsIds, 'user_id');
        const groupsIds = [...new Set(userGroupsIds.map(({group_id}) => group_id))];

        const groups = await knex('groups')
          .select('*')
          .whereIn('id', groupsIds);
        const groupsObj = array2Object(groups, 'id');

        Object.keys(groupedUserGroups).forEach((_userId) => {
          groupedUserGroups[_userId].forEach((_group) => {
            _group.groupInfo = groupsObj[_group.group_id];
          });
        });

        Object.keys(usersObj).forEach((_userId) => {
          usersObj[_userId].groups = groupedUserGroups[_userId];
        });
      }

      if (appends.includes('roles')) {
        const usersRolesIds = await knex('users_roles')
          .select('user_id', 'role_id');
        const groupedUsersRoles = groupBy(usersRolesIds, 'user_id');

        const roleIds = Object.values(groupedUsersRoles)
          .flat(1)
          .map(({role_id}) => role_id);
        const roleIdsSet = [...new Set(roleIds)];
        const roleNames = await knex('roles')
          .select('name', 'title', 'id')
          .whereIn('id', roleIdsSet);

        const rolesObj = array2Object(roleNames, 'id');

        Object.keys(groupedUsersRoles).forEach((_userId) => {
          const _userRoles = groupedUsersRoles[_userId].map(({role_id}) => rolesObj[role_id]);

          groupedUsersRoles[_userId] = _userRoles;
        });

        Object.keys(usersObj).forEach((_userId) => {
          usersObj[_userId].roles = groupedUsersRoles[_userId];
        });
      }
    }

    return Object.values(usersObj);

  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  searchUsers
};