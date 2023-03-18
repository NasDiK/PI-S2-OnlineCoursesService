import React, {useEffect} from 'react';
import Header from './Header';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';
import {AuthState} from '../../stores/core/UserStoreReducer';

export interface iState {
  userStore: AuthState
}

const WithHeader = (props) => {
  const {component} = props;
  const navigate = useNavigate();
  const logged = useSelector((state: iState) => state.userStore.userData.accessToken);

  useEffect(() => {
    if (!logged) {
      navigate('/auth');
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