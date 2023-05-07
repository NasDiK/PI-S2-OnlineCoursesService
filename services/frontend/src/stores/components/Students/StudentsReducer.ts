/* eslint-disable id-denylist,camelcase, @typescript-eslint/no-explicit-any*/
import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';

export interface iState {
  users: [],
  tasks:any [],
  answers:any [],
  groupedAnswers:any [],
  groupName: string
}

const initialState: iState = {
  users: [],
  tasks: [],
  answers: [],
  groupedAnswers: [],
  groupName: ''
};

export const setUsers = createAction('SET_USERS', (payload) => payload);
export const setTasks = createAction('SET_TASKS', (payload) => payload);
export const setAnswers = createAction('SET_ANSWERS', (payload) => payload);
export const setGroupName = createAction('SET_GROUP_NAME', (payload) => payload);
export const groupComponents = createAction('GROUP_COMPONENTS', (payload) => payload);
export const clearState = createAction('CLEAR_STATE', (payload) => payload);

const reducer = createReducer(initialState, {
  [setUsers.type]: (state: iState, action) => {
    state.users = action.payload;
  },
  [setTasks.type]: (state: iState, action) => {
    state.tasks = [{title: ''}];
    action.payload.map((task) => state.tasks.push(task));
    if (state.tasks.length > 1) {
      state.tasks.push({id: 999, title: 'Выполнено'});
    }
  },
  [setAnswers.type]: (state: iState, action) => {
    state.answers = action.payload;
  },
  [setGroupName.type]: (state: iState, action) => {
    state.groupName = action.payload;
  },
  [groupComponents.type]: (state: iState) => {
    if (!state.users || !state.tasks) {
      return;
    }
    const answersArr:any = [];

    state.users.forEach((student:any) => {
      let CompletedTasksCount = 0;

      state.tasks.forEach((task:any) => {
        if (task.id) {
          let answerValue = {value: '', user_id: student.id, task_id: task.id};

          if (state.answers) {
          // eslint-disable-next-line max-nested-callbacks
            state.answers.forEach((answer:any) => {

              if (student.id === answer.user_id && task.id === answer.task_id) {
                let valueAnswer;

                if (answer.value === 'false') {
                  valueAnswer = '0';
                } else if (answer.note !== null) {
                  valueAnswer = answer.note;
                } else if (answer.action === 4) {
                  valueAnswer = 'Отклонено';
                } else {
                  valueAnswer = 'Сдано';
                }
                answerValue = {value: valueAnswer, user_id: student.id, task_id: task.id};
                CompletedTasksCount++;
              }

            });
          }
          if (task.id === 999) {
            answersArr.push({value: `${CompletedTasksCount / (state.tasks.length - 2) * 100}%`,
              user_id: student.id,
              task_id: task.id});
          } else {
            answersArr.push(answerValue);
          }
        }
      });
    });
    state.groupedAnswers = answersArr;
  },
  [clearState.type]: (state: iState) => {
    state.users = [];
    state.tasks = [];
    state.answers = [];
    state.groupedAnswers = [];
    state.groupName = '';
  }
});

const rootReducer = combineReducers({
  studentsStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});
