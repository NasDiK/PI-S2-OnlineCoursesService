/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {Button, Typography} from '../../../shared';
import s from '../Students.module.scss';
import {useMatches} from 'react-router';
import {getGroupsById} from '../../../../api/groups';
import StudentsTable from './StudentsTable';
import {getAnswersLogs, getTasksByGroupId} from '../../../../api/tasks';
import {getUsersByGroup} from '../../../../api/users';
import {ExportCSV} from './ExportCSV';
import {useDispatch, useSelector} from 'react-redux';

const StudentsTableComponent = () => {
  const dispatch = useDispatch();
  const [match] = useMatches();
  const {id: groupId} = match.params;
  const groupName = useSelector((stores: any) => stores.studentsStore.groupName);

  useEffect(() => {
    getGroupsById(groupId).then((groups) => {
      const {title} = groups[0];

      dispatch({type: 'SET_GROUP_NAME', payload: title});
    });
    getTasksByGroupId(groupId).then((tasksList) => {
      const taskWithColumn = tasksList;

      taskWithColumn.push({id: 999, title: 'Выполнено'});
      dispatch({type: 'SET_TASKS', payload: taskWithColumn});
    });
    uploadTable();
  }, [groupId]);

  const uploadTable = () => {
    if (groupId !== undefined) {
      getAnswersLogs(groupId).then((answersList) => {
        if (!answersList.length) {
          dispatch({type: 'SET_ANSWERS', payload: undefined});
        } else {
          dispatch({type: 'SET_ANSWERS', payload: answersList});
        }
      });
      getUsersByGroup(groupId).then((usersList) => {
        dispatch({type: 'SET_USERS', payload: usersList});
      });
    }
  };

  return (
    <div className={s.content}>
      <div className={s.buttons}>
        <ExportCSV />
        <Button onClick={uploadTable}>
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