import {shortnameMaker} from '../../../utils';
import {iElement} from '../../../components/shared/BigPanelSelector/Components/ColumnElement';
import {targetFields} from '@local/enums/shared';

const groupReviewsForSelector = (reviews) => {
  const result: iElement = {
    id: -1,
    type: targetFields.ELEMENT_GROUP,
    name: 'Код-ревью',
    subGroup: []
  };

  reviews.reduce((acc: iElement, review) => {
    const _shortFullname = shortnameMaker(review.user_fullname);
    //короткое полное имя. F.e: Тунгусов А.С.

    const existSubgroup = result.subGroup?.find(({name}) => name === review['group_title']); //group

    if (existSubgroup) {
      const existUser = existSubgroup.subGroup?.find(({id}) => id === review.user_id);

      if (existUser) {
        //Задачи юзера сверка. коррекция на правильный лог.
        const existReview = existUser //если нашелся лог по этой задачи этого юзера, то...
          .subGroup?.find(({additionals: {taskId}}) => taskId === review.task_id);

        if (existReview) { //просто подменяем review_id на свежий
          existReview.id = review.log_id;
        } else {
          existUser.subGroup?.push({
            id: review.log_id,
            name: review.task_title,
            type: targetFields.ELEMENT,
            additionals: {
              taskId: review.task_id
            }
          });
        }
      } else {
        existSubgroup.subGroup?.push({
          id: review.user_id,
          name: _shortFullname,
          type: targetFields.ELEMENT_GROUP,
          subGroup: [
            {
              id: review.log_id,
              name: review.task_title,
              type: targetFields.ELEMENT,
              additionals: {
                taskId: review.task_id
              }
            }
          ]
        });
      }
    } else {
      acc.subGroup?.push({
        id: review.group_id,
        name: review.group_title,
        type: targetFields.ELEMENT_GROUP,
        subGroup: [{
          id: review.user_id,
          name: _shortFullname,
          type: targetFields.ELEMENT_GROUP,
          subGroup: [{
            id: review.log_id,
            name: review.task_title,
            type: targetFields.ELEMENT,
            additionals: {
              taskId: review.task_id
            }
          }]
        }]
      });
    }

    return acc;
  }, result);

  return result;
};

export {groupReviewsForSelector};