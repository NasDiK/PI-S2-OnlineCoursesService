import React from 'react';
import ProfilePageView from './ProfilePageView';
import {Provider, magic} from '../../../mobxUtils';
import PropTypes from 'prop-types';
import {ProfileStore} from '../../../stores/components/Profile/ProfileStore';

const ProfilePage = ({UserStore}) => {
  const profileStore = new ProfileStore({UserStore});

  return (
    <Provider ProfileStore={profileStore}>
      <ProfilePageView />
    </Provider>
  );
};

ProfilePage.propTypes = {
  UserStore: PropTypes.object
};

export default magic(ProfilePage, {store: 'UserStore'});