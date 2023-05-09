/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {makeAutoObservable, reaction} from 'mobx';
import {getReviewsLogs} from '../../../api/reviews';
import {getTaskById} from '../../../api/tasks';
import {UserStore} from '../../core/UserStore';

export class CourseStore {
  targetTaskId;
  courseId;

  targetTask;
  targetTaskLogs: any[] = [];
  allTaskLogs: any[] = [];
  disposers: any[] = [];

  userStore: UserStore;

  constructor({UserStore: us}) {
    makeAutoObservable(this, {
      disposers: false,
      courseId: false
    }, {autoBind: true});

    this.userStore = us;
    // const [courseId, taskId] = window.location.pathname
    //   .split('/')
    //   .slice(-2)
    //   .map((digit) => Number(digit));

    this.disposers.push(reaction(
      () => this.targetTaskId,
      () => {
        this._loadTask();
      },
      {fireImmediately: true}
    ));
  }

  get userId() {
    return this.userStore.userId;
  }

  _setTargetTask = (target) => {
    this.targetTask = target;
  };

  _setTargetTaskLogs = (targetLogs) => {
    this.targetTaskLogs = targetLogs;
  };

  _setAllTaskLogs = (logs) => {
    this.allTaskLogs = logs;
  };

  setTargetTaskId = (targetId) => {
    this.targetTaskId = targetId;
  };

  _loadTask = async() => {
    const pathName = window.location.pathname;
    const {userId} = this;

    if (!(/^\/course\/\d\/\d$/).test(pathName)) {
      return;
    }

    const [courseId, taskId] = pathName
      .split('/')
      .slice(-2)
      .map((digit) => Number(digit));

    const _task = await getTaskById(taskId, [
      'id',
      'value',
      'type',
      'max_note',
      'title',
      'description',
      'course_id',
      'weight'
    ]);

    const taskLogs = await getReviewsLogs([
      'tasks_logger.id as log_id',
      'tasks_logger.status as log_status',
      'action as log_action',
      'tasks_logger.user_id as user_id',
      'tasks.title as task_title',
      'tasks.description as task_description',
      'task_id as task_id',
      'createdAt as log_date',
      'tasks_logger.value as log_value',
      'groups.title as group_title',
      'groups.id as group_id',
      'users.fullname as user_fullname',
      'tasks.max_note as task_maxNote'
    ], ['tasks', 'users'], {
      tasksIds: [taskId],
      userIds: [userId]
    }, [
      ['user_id', 'asc'],
      ['task_id', 'asc'],
      ['tasks_logger.id', 'desc']
    ]);

    this._setTargetTaskLogs(taskLogs);
    this._setTargetTask(_task);
  };

  disposeAll = () => {
    this.disposers.forEach((disp) => disp());
  };
}