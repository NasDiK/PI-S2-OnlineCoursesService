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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkAnswer = async(taskId: number, answer: any) => {
  const {result} = await window.api()
    .path('/tasks/checkTaskAnswer')
    .body({
      taskId,
      answer
    })
    .executePost();

  return result;
};

export {
  getTaskById,
  searchTasks,
  checkAnswer
};