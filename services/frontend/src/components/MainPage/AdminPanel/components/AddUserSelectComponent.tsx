import React, {useEffect, useState} from 'react';
import DirectoryField from '../../../shared/Basic/DirectoryField/DirectoryField';
import {fieldType} from '@local/enums/dist/shared';
import {getCoursesList} from '../../../../api/courses';
import {getUsersByRole} from '../../../../api/users';
import {getGroups, getUsersInGroups} from '../../../../api/groups';
import {useSelector} from 'react-redux';
import s from '../../Courses/Components/styles.module.scss';
import Typography from '../../../shared/Basic/Typography/Typography';
import {useMatches} from 'react-router';
import {targetFields} from '@local/enums/shared';
import Button from '../../../shared/Basic/Button/Button';

const AddUserSelectComponent = () => {
  // eslint-disable-next-line
  const [users, setUsers]: any = useState<any>();
  const [teachers, setTeachers]: any = useState<any>();
  // eslint-disable-next-line
  const [usersIds, setusersIds]: any = useState<any>([]);
  const [mainElement, setMainElement] = useState<any>();
  const userId = useSelector((state: any) => state.userStore.userData.userId);

  const [match] = useMatches();
  const {id: groupId} = match.params;

  useEffect(() => {
    getUsersInGroups(groupId).then((x) => {
      // eslint-disable-next-line max-nested-callbacks
      const t = x.users.map((el) => el.user_id);

      setusersIds(t);
    });
  }, [groupId]);

  useEffect(() => {
    getCoursesList([userId]).then((x) => {
      setMainElement(x);
    });
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

  const changeGroup = () => {

    // eslint-disable-next-line no-console
    console.log('adasd');
  };

  return (
    <div>
      <div className={s.text}>
        <Typography variant={'body24'}>{'Выберите студентов'}</Typography>
      </div>
      <DirectoryField
        type={fieldType.SELECT}
        size={'small'}
        options={optionsUsers}
        /* eslint-disable-next-line no-console */
        onChange={(val) => setusersIds(val)}
        multiple={true}
        variant={'multi'}
        value={usersIds}
      />
      <div className={s.text}>
        <Typography variant={'body24'}>{'Выберите преподавателя'}</Typography>
      </div>
      <DirectoryField
        type={fieldType.SELECT}
        size={'small'}
        options={optionsTeachers}
        /* eslint-disable-next-line no-console */
        onChange={(val) => setusersIds(val)}
        multiple={true}
        variant={'multi'}
        value={usersIds}
      />
      <Button
        variant={'primary'}
        onClick={
          () => changeGroup()
        }
      >{'Сохранить'}
      </Button>
    </div>
  );
};

export default AddUserSelectComponent;