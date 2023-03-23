import {targetFields} from '@local/enums/shared';
import {getTaskById, checkAnswer} from '../../../../../api/tasks';
import {iElement} from '../../../../shared/BigPanelSelector/Components/ColumnElement';

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

  // eslint-disable-next-line no-console
  console.log(task);
  dispatchFunc(task);
};

const checkTaskAnswer = async(taskId, answer) => {
  try {
    const result = await checkAnswer(taskId, answer);

    alert(result);
  } catch{
    alert('Произошла ошибка');
  }
};

const groupTasksForSidebar = (tasks) => {

  return {
    id: tasks[0].course_id, //TODO CourseID
    name: 'MOCK_COURSE_NAME',
    type: targetFields.ELEMENT_GROUP,
    isDone: false,
    progress: 0,
    subGroup: tasks.map((task) => {
      return {
        id: task.id,
        name: task.title,
        type: targetFields.ELEMENT,
        'max_note': task.max_note
      };
    })
  };
};

export {searchTaskWithId, groupTasksForSidebar, checkTaskAnswer};