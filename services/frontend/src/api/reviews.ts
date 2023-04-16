export const tasksLoggerFieldsNamesEnum = {
  ID: 'id',
  USER_ID: 'user_id',
  TASK_ID: 'task_id',
  NOTE: 'note',
  ACTION: 'action',
  VALUE: 'value',
  CREATED_AT: 'createdAt',
  CREATED_BY: 'createdBy'
};

const getReviewsLogs = async(fields, appends, filter, orders: [string, string][]) => {
  const _list = await window.api()
    .path('/reviews/getReviewsLogs')
    .body({
      filter,
      appends,
      fields,
      orders
    })
    .executePost();

  return _list;
};

export {
  getReviewsLogs
};