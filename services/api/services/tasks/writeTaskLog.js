const writeTaskLog = async(knex, request, task, logOptions) => {
  const {userId} = request.headers;

  await knex('tasks_logger').insert({
    'user_id': logOptions.userId,
    'task_id': task.id,
    action: logOptions.action,
    'value': logOptions.value,
    createdBy: userId
  });
};

module.exports = writeTaskLog;