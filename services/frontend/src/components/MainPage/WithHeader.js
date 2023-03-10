import React, {useEffect} from 'react';
import Header from './Header.tsx';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';

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