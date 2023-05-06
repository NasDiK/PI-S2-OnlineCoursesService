export const tasksFieldsNamesEnum = {
  ID: 'tasks.id',
  COURSE_ID: 'tasks.course_id',
  TITLE: 'tasks.title',
  DESCRIPTION: 'tasks.description',
  VALUE: 'tasks.value',
  TYPE: 'tasks.type',
  MAX_NOTE: 'tasks.max_note',
  WEIGHT: 'tasks.weight',
  CORRECT_ANSWER: 'tasks.correctAnswer'
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
  parentIds?: number[],
  appends?: [string, string, string, string][]
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