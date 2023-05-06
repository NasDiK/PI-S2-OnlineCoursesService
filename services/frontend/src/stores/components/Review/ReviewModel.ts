/* eslint-disable no-console */
import {action} from '@local/enums/tasks';
export class ReviewModel {
  private review;
  private triggers;

  constructor(review, triggers) {
    this.review = review;
    this.triggers = triggers;
  }

  get id() {
    return this.review?.log_id;
  }

  get description() {
    return this.review?.task_description;
  }

  get title() {
    return this.review?.task_title;
  }

  get maxNote() {
    return this.review?.task_maxNote;
  }

  get logDate() {
    return this.review?.log_date;
  }

  get logValue() {
    return this.review?.log_value;
  }

  get logAction() {
    return this.review?.log_action;
  }

  get isPermittedToApprove() {
    return this.logAction === action.SEND_TO_REVIEW; //TODO write normal logic
  }

  get isPermittedToFail() {
    return this.logAction === action.SEND_TO_REVIEW; //TODO write normal logic
  }

  get logUserId() {
    return this.review?.user_id;
  }

  get taskId() {
    return this.review?.task_id;
  }

  get textStatus() {
    switch (this.logAction) {
      case action.REVIEW_APPROVE:
        return 'Ревью одобрено';
      case action.REVIEW_FAIL:
        return 'Ревью отклонено';
      default:
        return null;
    }
  }

  approveReview = async() => {
    const {taskId, logUserId: userId, logValue} = this;

    try {
      await window.api().path('/tasks/writeTaskLog')
        .body({
          taskId,
          logOptions: {
            action: action.REVIEW_APPROVE,
            userId,
            'value': logValue
          }
        })
        .executePost();
      window.notify({
        variant: 'success',
        message: 'Успешно одобрено'
      });
    } catch{
      window.notify({
        variant: 'error',
        message: 'Произошла ошибка отправки запроса'
      });
    } finally {
      await this.triggers.refreshReviewTrigger();
      this.triggers.rerenderReviewTrigger();
    }
  };

  failReview = async() => {
    const {taskId, logUserId: userId, logValue} = this;

    try {
      await window.api().path('/tasks/writeTaskLog')
        .body({
          taskId,
          logOptions: {
            action: action.REVIEW_FAIL,
            userId,
            'value': logValue
          }
        })
        .executePost();
      window.notify({
        variant: 'success',
        message: 'Успешно одобрено'
      });
    } catch{
      window.notify({
        variant: 'error',
        message: 'Произошла ошибка отправки запроса'
      });
    } finally {
      await this.triggers.refreshReviewTrigger(); //массив логов обновленный
      this.triggers.rerenderReviewTrigger();
    }
  };

  fakeTimeout() {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((res) => setTimeout(res, 500));
  }
}