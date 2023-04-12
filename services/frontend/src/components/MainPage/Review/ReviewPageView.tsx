import React, {useEffect} from 'react';
import {BigPanelSelector} from '../../../components/shared';
import {useDispatch, useSelector} from 'react-redux';
import ReviewComponent from './Components/ReviewComponent';
import {getReviewsLogs} from '../../../api/reviews';
import {groupReviewsForSelector} from './Methods';

const ReviewPageView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getReviewsLogs([
      'tasks_logger.id as log_id',
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
    ], ['tasks', 'users'], {}, [
      ['user_id', 'asc'],
      ['task_id', 'asc'],
      ['createdAt', 'asc']
    ])
      .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result);
        dispatch({type: 'SET_REVIEWS_LIST', payload: result});
        dispatch({type: 'SET_SELECTOR_GROUPS', payload: groupReviewsForSelector(result)});
      });
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = useSelector((state: any) => state.reviewStore.element);

  return (
    <BigPanelSelector
      element={element}
      renderableComponent={<ReviewComponent />}
      elementLink={'/review/'}
    />
  );
};

export default ReviewPageView;