import React, {useEffect} from 'react';
import Header from './Header';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';
import s from './MainPage.module.scss';
import {tryAuth} from '../AuthPage/AuthPageView';

const WithHeader = (props) => {
  const {component} = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('access');

  useEffect(() => {
    if (token) {
      tryAuth(dispatch, navigate, token).then((_) => {
        if (!_.userData.id.id) {
          navigate('/auth');
        }
      });
    } else {
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