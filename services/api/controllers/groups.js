const config = require('../knexfile.js');
const {logger} = require('../core');
const knex = require('knex')(config.development);

const createGroup = async(req, res) => {
  try {
    const {groupName, courseId} = req.body;

    await knex('groups').insert({
      'title': groupName,
      'course_id': courseId
    });

    return res.status(200).json({message: 'Курс добавлен'});
  } catch(exception) {
    logger.error(exception);
    res.status(400).json({message: exception});
  }
};
const getGroups = async(req, res) => {
  try {

    const groups = await knex('groups').select('id', 'title', 'course_id');

    return res.status(200).json({groups});
  } catch(exception) {
    logger.error(exception);
    res.status(400).json({message: exception});
  }
};

const getUsersInGroup = async(req, res) => {
  try {
    const {groupId} = req.body;
    const users = await knex('groups_users')
      .select('user_id')
      .where('group_id', groupId);

    return res.status(200).json({users});
  } catch(exception) {
    logger.error(exception);
    res.status(400).json({message: exception});
  }
};

const saveGroupChanges = async(req, res) => {
  try {
    const {groupId, usersIds} = req.body;
    const userIdsFromDB = await knex('groups_users')
      .select('user_id')
      .where('group_id', groupId);
    const userIdsFromDBArray = userIdsFromDB.map((x) => x.user_id);
    const usersForAdd = [];
    const usersForDelete = [];

    userIdsFromDBArray.forEach((x) => {
      if (!usersIds.includes(x)) {
        usersForDelete.push(x);
      }
    });

    usersIds.forEach((x) => {
      if (!userIdsFromDBArray.includes(x)) {
        usersForAdd.push(x);
      }
    });

    const objUsers = usersForAdd.map((x) => {
      return {
        'group_id': groupId,
        'user_id': x,
        'isModerator': false
      };
    });

    await knex('groups_users')
      .where('group_id', groupId)
      .whereIn('user_id', usersForDelete)
      .delete();

    await knex('groups_users')
      .insert(objUsers)
      .where('group_id', groupId);

    return res.status(200).json({message: 'Выполнено'});
  } catch(exception) {
    logger.error(exception);
    res.status(400).json({message: exception});
  }
};

module.exports = {
  createGroup,
  getGroups,
  getUsersInGroup,
  saveGroupChanges
};