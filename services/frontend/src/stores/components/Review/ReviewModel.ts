export class ReviewModel {
  task;

  constructor(task) {
    this.task = task;
  }

  get description() {
    return this.task.description;
  }

  get title() {
    return this.task.title;
  }
}