import React, {useEffect} from 'react';
import {useMatches} from 'react-router';

const ReviewComponent = () => {
  const [{params: {reviewId}}] = useMatches();
  const _reviewId = Number(reviewId);

  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
  useEffect(() => {}, [reviewId]);

  // eslint-disable-next-line no-console
  console.log(reviewId);

  return <div>{`test #${_reviewId}`}</div>;
};

export default ReviewComponent;