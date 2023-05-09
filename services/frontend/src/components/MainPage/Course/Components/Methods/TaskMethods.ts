import {targetFields} from '@local/enums/shared';
import {getTaskById, checkAnswer} from '../../../../../api/tasks';

const searchTaskWithId = async(dispatchFunc, taskId) => {
  const task = await getTaskById(taskId, [
    'id',
    'value',
    'type',
    'max_note',
    'title',
    'description',
    'course_id',
    'weight'
  ]);

  dispatchFunc(task);
};

const checkTaskAnswer = async(taskId, answer) => {
  try {
    await checkAnswer(taskId, answer);

    window.notify({
      message: 'Успешно отправлено',
      variant: 'success'
    });
  } catch{
    window.notify({
      message: 'Произошла ошибка при отправке задания',
      variant: 'error'
    });
  }
};

const groupTasksForSidebar = (tasks) => {

  return {
    id: tasks[0].course_id,
    name: tasks[0].course_title,
    type: targetFields.ELEMENT_GROUP,
    isDone: false,
    progress: 0,
    subGroup: tasks.map((task) => {
      return {
        id: task.id,
        name: task.title,
        type: targetFields.ELEMENT
      };
    })
  };
};

export {searchTaskWithId, groupTasksForSidebar, checkTaskAnswer};