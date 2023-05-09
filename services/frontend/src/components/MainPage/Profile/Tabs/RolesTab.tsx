import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '../../../shared';
import {magic} from '../../../../mobxUtils';

const RolesTab = ({userRoles}) => (
  <div>
    <Typography weight={'medium'}>{`Роли: `}</Typography>
    <Typography>{userRoles.join(', ')}</Typography>
  </div>
);

const mapStore = ({ProfileStore}) => {
  return {
    userRoles: ProfileStore.userRoles
  };
};

RolesTab.propTypes = {
  userRoles: PropTypes.array
};

export default magic(RolesTab, {store: mapStore});