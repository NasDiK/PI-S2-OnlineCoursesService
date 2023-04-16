import React from 'react';
import ReviewPageView from './ReviewPageView';
import {Provider} from 'react-redux';
import {store as reducerStore} from '../../../stores/components/Review/ReviewReducer';

const ReviewPage = () => (
  <Provider store={reducerStore}>
    <ReviewPageView />
  </Provider>
);

export default ReviewPage;