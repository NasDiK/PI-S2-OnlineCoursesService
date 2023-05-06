import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import s from './MainPage.module.scss';

const WithHeader = (props) => {
  const {component} = props;

  return (
    <div className={s.wrapper}>
      <Header />
      {component}
    </div>
  );
};

WithHeader.propTypes = {
  component: PropTypes.node
};

export default WithHeader;