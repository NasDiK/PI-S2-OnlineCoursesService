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
    dispatch({type: 'CLEAR_STATE'});
  }, [match.pathname]);

  useEffect(() => {
    if (groupId) {
      getGroupsById(groupId).then((groups) => {
        const [{title}] = groups;

        dispatch({type: 'SET_GROUP_NAME', payload: title});
      });
      getTasksByGroupId(groupId).then((tasksList) => {
        dispatch({type: 'SET_TASKS', payload: tasksList});
      });
      uploadTable();
    }
  }, [groupId]);

  const uploadTable = () => {
    if (groupId) {
      getAnswersLogs(groupId).then((answersList) => {
        if (!answersList.length) {
          dispatch({type: 'SET_ANSWERS'});
        } else {
          dispatch({type: 'SET_ANSWERS', payload: answersList});
        }
        getUsersByGroup(groupId).then((usersList) => {
          dispatch({type: 'SET_USERS', payload: usersList});
          dispatch({type: 'GROUP_COMPONENTS'});
        });
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