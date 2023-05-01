export const tasksFieldsNamesEnum = {
  ID: 'id',
  COURSE_ID: 'course_id',
  TITLE: 'title',
  DESCRIPTION: 'description',
  VALUE: 'value',
  TYPE: 'type',
  MAX_NOTE: 'max_note',
  WEIGHT: 'weight',
  CORRECT_ANSWER: 'correctAnswer'
};

const getTaskById = (taskId: number, fields: string []) => {
  const task = window.api()
    .path('/tasks/getTaskById')
    .body({
      taskId,
      fields
    })
    .executePost();

  return task;
};

type tasksFilter = {
  tasksIds?: number[],
  fields?: string[],
  coursesIds?: number[],
  parentIds?: number[]
};

const searchTasks = (filter: tasksFilter) => {
  const tasks = window.api()
    .path('/tasks/searchTasks')
    .body({
      ...filter
    })
    .executePost();

  return tasks;
};

const checkAnswer = async(taskId: number, answer) => {
  const {result} = await window.api()
    .path('/tasks/checkTaskAnswer')
    .body({
      taskId,
      answer
    })
    .executePost();

  return result;
};

const getTasksByGroupId = async(groupId) => {
  const result = await window.api()
    .path('/tasks/getTasksByGroupId')
    .body({groupId})
    .executePost();

  return result;
};

const getAnswersLogs = async(groupId) => {
  const result = await window.api()
    .path('/tasks/getAnswersLogs')
    .body({groupId})
    .executePost();

  return result;
};

const getAllLogs = async() => {
  const result = await window.api()
    .path('/tasks/getAllLogs')
    .executePost();

  return result;
};

export {
  getTaskById,
  searchTasks,
  checkAnswer,
  getTasksByGroupId,
  getAnswersLogs,
  getAllLogs
};