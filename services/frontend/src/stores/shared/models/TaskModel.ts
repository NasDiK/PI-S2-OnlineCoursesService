export default class TaskModel {
  private _task: iTask;

  constructor(task) {
    this._task = task;
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
    return true;
  }

  get isPermittedWatchLogs() {
    return true;
  }
}