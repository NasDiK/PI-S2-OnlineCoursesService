import React, {useState} from 'react';
import {Button, Typography} from '../../../shared';
import s from '../Students.module.scss';
import {useMatches} from 'react-router';
import {getGroupsById} from '../../../../api/groups';
import StudentsTable from './StudentsTable';

const StudentsTableComponent = () => {
  const [groupName, setGroupName] = useState();
  const [match] = useMatches();
  const {id: groupId} = match.params;

  getGroupsById(groupId).then((groups) => {
    const {title} = groups[0];

    setGroupName(title);
  });

  return (
    <div className={s.content}>
      <div className={s.buttons}>
        <Button>
          {'Экспорт в эксель'}
        </Button>
        <Button>
          {'Обновить таблицу'}
        </Button>
        <div className={s.title}>
          <Typography variant={'body24'} weight={'bold'}>{groupName}</Typography>
        </div>
      </div>
      <div className={s.table}>
        <StudentsTable />
      </div>
    </div>
  );
};

export default StudentsTableComponent;