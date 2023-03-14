import React, {useEffect} from 'react';
import Header from './Header.tsx';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';
import s from './MainPage.module.scss';

const WithHeader = (props) => {
  const {component} = props;
  const navigate = useNavigate();
  const logged = useSelector((state) => state.userStore.logged);

  useEffect(() => {
    if (!logged) {
      navigate('/auth');
    }
  }, []);

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