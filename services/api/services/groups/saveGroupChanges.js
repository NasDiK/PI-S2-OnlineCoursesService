const {logger} = require('../../core');
const saveGroupChanges = async(knex, req) => {
  try {
    const {groupId, usersIds} = req.body;
    const userIdsFromDB = await knex('groups_users')
      .pluck('user_id')
      .where('group_id', groupId);

    const usersForDelete = userIdsFromDB.filter((id) => !usersIds.includes(id));
    const usersForAdd = usersIds.filter((id) => !userIdsFromDB.includes(id));
    const users = usersForAdd.map((userId) => {
      return {
        'group_id': groupId,
        'user_id': userId,
        'isModerator': false
      };
    });

    await Promise.all([
      knex('groups_users')
        .where('group_id', groupId)
        .whereIn('user_id', usersForDelete)
        .delete(),
      knex('groups_users')
        .insert(users)
        .where('group_id', groupId)
    ]);

    return 'Выполнено';
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  saveGroupChanges
};