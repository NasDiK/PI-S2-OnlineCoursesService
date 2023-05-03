import React, {useEffect, useState} from 'react';
import {fieldType} from '@local/enums/dist/shared';
import {Button, Typography, DirectoryField} from '../../../shared';
import {getUsersByRoleName} from '../../../../api/users';
import {getUsersInGroups, saveGroupChanges} from '../../../../api/groups';
import {useSelector} from 'react-redux';
import s from '../../AdminPanel/components/AddUserSelectComponent.module.scss';
import {useMatches} from 'react-router';

const AddUserSelectComponent = () => {
  // eslint-disable-next-line
  const [users, setUsers]: any = useState<any>();
  // eslint-disable-next-line
  const [teachers, setTeachers]: any = useState<any>();
  // eslint-disable-next-line
  const [usersIds, setUsersIds]: any = useState<any>([]);
  // eslint-disable-next-line
  const userId = useSelector((state: any) => state.userStore.userData.userId);
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
          onClick={
            () => saveGroupChanges(groupId, usersIds)
          }
        >{'Сохранить'}
        </Button>
      </div>
    </div>
  );
};

export default AddUserSelectComponent;