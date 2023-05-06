/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {fieldType} from '@local/enums/shared';
import {Button, Typography, DirectoryField} from '../../../shared';
import {getUsersByRoleName} from '../../../../api/users';
import {getUsersInGroups, saveGroupChanges} from '../../../../api/groups';
import s from '../../AdminPanel/components/AddUserSelectComponent.module.scss';
import {useMatches} from 'react-router';
import {magic} from '../../../../mobxUtils';
import PropTypes from 'prop-types';

const AddUserSelectComponent = ({UserStore}) => {
  const [users, setUsers] = useState<any>();
  const [teachers, setTeachers] = useState<any>();
  const [usersIds, setUsersIds] = useState<any>([]);
  const {userId} = UserStore;
  const [match] = useMatches();
  const {id: groupId} = match.params;

  useEffect(() => {
    getUsersInGroups(groupId).then((x) => {
      // eslint-disable-next-line max-nested-callbacks
      setUsersIds(x.map((el) => el.user_id));
    });
  }, [groupId]);

  useEffect(() => {
    getUsersByRoleName(['student']).then((x) => {
      setUsers(x);
    });
    getUsersByRoleName(['teacher']).then((x) => {
      setTeachers(x);
    });
  }, [userId]);

  const optionsUsers = users?.map(({fullname, id}) => {
    // eslint-disable-next-line id-denylist
    return {label: fullname, value: id};
  });
  const optionsTeachers = teachers?.map(({fullname, id}) => {
    // eslint-disable-next-line id-denylist
    return {label: fullname, value: id};
  });

  return (
    <div className={s.column}>
      <div className={s.text}>
        <Typography variant={'body20'} weight={'bold'}>{'Выберите студентов'}</Typography>
      </div>
      <DirectoryField
        type={fieldType.SELECT}
        size={'small'}
        options={optionsUsers}
        onChange={(val) => setUsersIds(val)}
        isMulti={true}
        value={usersIds}
      />
      <div className={s.text}>
        <Typography variant={'body20'} weight={'bold'}>{'Выберите преподавателя'}</Typography>
      </div>
      <DirectoryField
        type={fieldType.SELECT}
        size={'small'}
        options={optionsTeachers}
        onChange={(val) => setUsersIds(val)}
        isMulti={true}
        value={usersIds}
      />
      <div className={s.button}>
        <Button
          variant={'primary'}
          fullWidth={true}
          onClick={() => saveGroupChanges(groupId, usersIds)}
        >{'Сохранить'}
        </Button>
      </div>
    </div>
  );
};

AddUserSelectComponent.propTypes = {
  UserStore: PropTypes.object
};

export default magic(AddUserSelectComponent, {store: 'UserStore'});