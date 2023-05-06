import React from 'react';
import AdminPanelPageView from './AdminPanelPageView';
import {magic} from '../../../mobxUtils';
import PropTypes from 'prop-types';
import {roles} from '@local/enums/roles';

const AdminPanelPage = ({hasRole}) => {
  if (!hasRole(roles.ADMIN)) {
    return <h2>{'Нет прав'}</h2>;
  }

  return <AdminPanelPageView />;
};

const mapStore = ({UserStore}) => {
  return {
    hasRole: UserStore.hasRole
  };
};

AdminPanelPage.propTypes = {
  hasRole: PropTypes.func
};

export default magic(AdminPanelPage, {store: mapStore});