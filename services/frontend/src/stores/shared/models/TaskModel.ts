/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable id-denylist */
/* eslint-disable camelcase */
import {action} from '@local/enums/tasks';

type TaskLog = {
  log_action: number,
  id: number,
  log_value: any
};

export default class TaskModel {
  private _task: iTask;
  private _taskLogs: TaskLog[] = [];

  constructor(task, taskLogs) {
    this._task = task;
    this._taskLogs = taskLogs;
  }

  get id() {
    return this._task?.id;
  }

  get description() {
    return this._task?.description;
  }

  get maxNote() {
    return this._task?.max_note;
  }

  get title() {
    return this._task?.title;
  }

  get type() {
    return this._task?.type;
  }

  get taskValue() {
    return this._task?.value;
  }

  get weight() {
    return this._task?.weight;
  }

  get isPermittedSend() {
    const {log_action: logAction} = this.lastlog || {log_action: -1};

    switch (logAction) {
      case action.REVIEW_APPROVE:
      case action.SEND_TO_REVIEW:
      case action.SEND:
        return false;
      case action.REVIEW_FAIL:
      default:
        return true;
    }
  }

  get lastlog(): any {
    const [result] = this._taskLogs?.length && this._taskLogs.slice(-1) || [undefined];

    return result;
  }

  get lastLogValue() {
    const {log_value} = this.lastlog || {log_value: undefined};

    return log_value;
  }

  get isPermittedWatchLogs() {
    return true;
  }
}