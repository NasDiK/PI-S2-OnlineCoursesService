/* eslint-disable id-denylist,camelcase, @typescript-eslint/no-explicit-any*/
import React, {useEffect} from 'react';
import s from '../AdminPanel.module.scss';
import {Button, DirectoryField, Typography} from '../../../shared';
import {fieldType} from '@local/enums/shared';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersByRoleName} from '../../../../api/users';
import {getRoles} from '../../../../api/roles';

const RolesComponent = () => {

  const dispatch = useDispatch();
  const users = useSelector((stores: any) => stores.adminStore.usersOptions);
  const roles = useSelector((stores: any) => stores.adminStore.rolesOptions);
  const selectedUsers = useSelector((stores: any) => stores.adminStore.selectedUsers);
  const selectedRole = useSelector((stores: any) => stores.adminStore.selectedRole);

  useEffect(() => {
    getUsersByRoleName('student').then((x) => {
      dispatch({type: 'SET_USERS', payload: x});
    });
    getUsersByRoleName('teacher').then((x) => {
      dispatch({type: 'SET_USERS', payload: x});
    });
    getRoles().then((x) => {
      dispatch({type: 'SET_ROLE', payload: x});
    });
  }, []);

  const setUsersIds = (usersIds) => {
    dispatch({type: 'SET_SELECTED_USERS', payload: usersIds});
  };

  const setRole = (roleId) => {
    dispatch({type: 'SET_SELECTED_ROLE', payload: roleId});
  };

  const clearSelected = () => {
    dispatch({type: 'CLEAR_SELECTED'});
  };

  const changeRole = () => {
    dispatch({type: 'CHANGE_ROLES'});
  };

  return (
    <div className={s.roles}>
      <div className={s.selector}>
        <Typography variant={'body20'} weight={'bold'}>{'Выберите пользователя'}</Typography>
        <DirectoryField
          type={fieldType.SELECT}
          size={'small'}
          options={users}
          onChange={(val) => setUsersIds(val)}
          isMulti={true}
          value={selectedUsers}
        />
      </div>
      <div className={s.selector}>
        <Typography variant={'body20'} weight={'bold'}>{'Выберите роль'}</Typography>
        <DirectoryField
          type={fieldType.SELECT}
          size={'small'}
          options={roles}
          onChange={(val) => setRole(val)}
          value={selectedRole}
        />
      </div>
      <div className={s.buttons}>
        <Button
          fullWidth={true}
          onClick={changeRole}
        >
          {'Сохранить'}
        </Button>
        <Button
          fullWidth={true}
          onClick={clearSelected}
        >
          {'Сбросить'}
        </Button>
      </div>
    </div>
  );
};

export default RolesComponent;