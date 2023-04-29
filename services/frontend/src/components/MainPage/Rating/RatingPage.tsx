import React from 'react';
import RatingPageView from './RatingPageView';
import {store as ratingStore} from '../../../stores/components/Rating/RatingReducer';
import {Provider} from 'react-redux';

const RatingPage = () => (
  <Provider store={ratingStore}>
    <RatingPageView />
  </Provider>
);

export default RatingPage;