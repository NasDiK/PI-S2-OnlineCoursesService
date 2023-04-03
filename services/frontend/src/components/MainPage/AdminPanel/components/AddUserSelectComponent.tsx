import React, {useEffect, useState} from 'react';
import DirectoryField from '../../../shared/Basic/DirectoryField/DirectoryField';
import {fieldType} from '@local/enums/dist/shared';
import {getCoursesList} from '../../../../api/courses';
import {getUsersByRole} from '../../../../api/users';
import {getGroups} from '../../../../api/groups';
import {useSelector} from 'react-redux';
import s from '../../Courses/Components/styles.module.scss';
import Typography from '../../../shared/Basic/Typography/Typography';

const AddUserSelectComponent = () => {
  // eslint-disable-next-line
  const [users, setUsers]: any = useState<any>();
  const [teachers, setTeachers]: any = useState<any>();
  // eslint-disable-next-line
  const [usersIds, setusersIds]: any = useState<any>([]);
  const [mainElement, setMainElement] = useState<any>();
  const userId = useSelector((state: any) => state.userStore.userData.userId);

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
    </div>
  );
};

export default AddUserSelectComponent;