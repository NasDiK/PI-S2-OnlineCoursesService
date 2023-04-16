const writeTaskLog = (
  knex,
  request,
  taskId = request.body.taskId,
  logOptions = request.body.logOptions
) => {
  const {userId} = request.body;

  return knex('tasks_logger').insert({
    'user_id': logOptions.userId,
    'task_id': taskId,
    action: logOptions.action,
    'value': logOptions.value,
    createdBy: userId
  });
};

module.exports = writeTaskLog;