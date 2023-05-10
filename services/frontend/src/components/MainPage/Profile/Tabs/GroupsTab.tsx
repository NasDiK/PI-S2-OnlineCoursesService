import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '../../../shared';
import {magic} from '../../../../mobxUtils';

const GroupsTab = ({userGroups}) => (
  <div>
    <Typography weight={'medium'}>{`Состоит в группах: `}</Typography>
    <Typography>{userGroups.map(({groupInfo}) => groupInfo.title).join(', ')}</Typography>
  </div>
);

const mapStore = ({ProfileStore}) => {
  return {
    userGroups: ProfileStore.userInfo.groups
  };
};

GroupsTab.propTypes = {
  userGroups: PropTypes.array
};

export default magic(GroupsTab, {store: mapStore});