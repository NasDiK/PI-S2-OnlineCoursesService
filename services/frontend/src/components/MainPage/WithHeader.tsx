import React, {useEffect} from 'react';
import Header from './Header';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';
import {AuthState} from '../../stores/core/UserStoreReducer';
import {tryAuth} from '../AuthPage/AuthPageView';
export interface iState {
  userStore: AuthState
}

const WithHeader = (props) => {
  const {component} = props;
  const navigate = useNavigate();
  const logged = useSelector((state: iState) => state.userStore.userData.accessToken);
  const dispatch = useDispatch();
  const token = localStorage.getItem('access');

  useEffect(() => {
    if (token) {
      tryAuth(dispatch, navigate, token).then((_) => {
        if (!logged) {
          navigate('/auth');
        }
      });
    }

  }, []);

  return (
    <React.Fragment>
      <Header />
      {component}
    </React.Fragment>
  );
};

WithHeader.propTypes = {
  component: PropTypes.node
};

export default WithHeader;