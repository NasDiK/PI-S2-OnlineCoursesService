import React from 'react';
import {BigPanelSelector} from '../../../components/shared';
import {useSelector} from 'react-redux';
import ReviewComponent from './Components/ReviewComponent';

const ReviewPageView = () => {
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