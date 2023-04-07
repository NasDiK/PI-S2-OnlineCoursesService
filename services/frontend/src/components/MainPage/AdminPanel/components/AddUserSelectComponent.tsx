import React, {useEffect, useState} from 'react';
import DirectoryField from '../../../shared/Basic/DirectoryField/DirectoryField';
import {fieldType} from '@local/enums/dist/shared';
import {getUsersByRole} from '../../../../api/users';
import {getUsersInGroups, saveGroupChanges} from '../../../../api/groups';
import {useSelector} from 'react-redux';
import s from '../../AdminPanel/components/AddUserSelectComponent.module.scss';
import Typography from '../../../shared/Basic/Typography/Typography';
import {useMatches} from 'react-router';
import Button from '../../../shared/Basic/Button/Button';

const AddUserSelectComponent = () => {
  // eslint-disable-next-line
  const [users, setUsers]: any = useState<any>();
  const [teachers, setTeachers]: any = useState<any>();
  // eslint-disable-next-line
  const [usersIds, setusersIds]: any = useState<any>([]);
  const userId = useSelector((state: any) => state.userStore.userData.userId);
  const [match] = useMatches();
  const {id: groupId} = match.params;

  useEffect(() => {
    getUsersInGroups(groupId).then((x) => {
      // eslint-disable-next-line max-nested-callbacks
      setusersIds(x.users.map((el) => el.user_id));
    });
  }, [groupId]);

  useEffect(() => {
    getUsersByRole(12).then((x) => {
      setUsers(x);
    });
    getUsersByRole(11).then((x) => {
      setTeachers(x);
    });
  }, [userId]);

  const optionsUsers = users?.users.map((el) => {
    // eslint-disable-next-line id-denylist
    return {label: el.fullname, value: el.id};
  });
  const optionsTeachers = teachers?.users.map((el) => {
    // eslint-disable-next-line id-denylist
    return {label: el.fullname, value: el.id};
  });

  const saveChanges = () => {
    saveGroupChanges(groupId, usersIds);
  };

  return (
    <div className={s.column}>
      <div className={s.text}>
        <Typography variant={'body20'} weight={'bold'}>{'Выберите студентов'}</Typography>
      </div>
      <DirectoryField
        type={fieldType.SELECT}
        size={'small'}
        options={optionsUsers}
        onChange={(val) => setusersIds(val)}
        multiple={true}
        variant={'multi'}
        value={usersIds}
      />
      <div className={s.text}>
        <Typography variant={'body20'} weight={'bold'}>{'Выберите преподавателя'}</Typography>
      </div>
      <DirectoryField
        type={fieldType.SELECT}
        size={'small'}
        options={optionsTeachers}
        onChange={(val) => setusersIds(val)}
        multiple={true}
        variant={'multi'}
        value={usersIds}
      />
      <div className={s.button}>
        <Button
          variant={'primary'}
          fullWidth={true}
          onClick={
            () => saveChanges()
          }
        >{'Сохранить'}
        </Button>
      </div>
    </div>
  );
};

export default AddUserSelectComponent;