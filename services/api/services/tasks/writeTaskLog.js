const writeTaskLog = async(knex, request, task, logOptions) => {
  const {userId} = request.headers;

  await knex('tasks_logger').insert({
    'user_id': userId,
    'task_id': task.id,
    action: logOptions.action,
    'value': logOptions.value
  });
};

module.exports = writeTaskLog;