import React, {useEffect, useState} from 'react';
import {Button, Typography} from '../../../shared';
import s from '../Students.module.scss';
import {useMatches} from 'react-router';
import {getGroupsById} from '../../../../api/groups';
import StudentsTable from './StudentsTable';
import {getAnswersLogs, getTasksByGroupId} from '../../../../api/tasks';
import {getUsersByGroup} from '../../../../api/users';
import {ExportCSV} from './ExportCSV';

const StudentsTableComponent = () => {
  const [groupName, setGroupName] = useState();
  const [tasks, setTasks] = useState();
  const [users, setUsers] = useState();
  const [answers, setAnswers] = useState();
  const [match] = useMatches();
  const {id: groupId} = match.params;

  useEffect(() => {
    getGroupsById(groupId).then((groups) => {
      const {title} = groups[0];

      setGroupName(title);
    });

    if (groupId !== undefined) {
      getAnswersLogs(groupId).then((answersList) => {
        if (!answersList.length) {
          setAnswers(undefined);
        } else {
          setAnswers(answersList);
        }
      });
      getTasksByGroupId(groupId).then((tasksList) => {
        setTasks(tasksList);
      });
      getUsersByGroup(groupId).then((usersList) => {
        setUsers(usersList);
      });
    }
  }, [groupId]);

  return (
    <div className={s.content}>
      <div className={s.buttons}>
        <ExportCSV csvData={{tasks, users, answers}} fileName={'Export'} />
        {/*        <Button>
          {'Экспорт в эксель'}
        </Button>*/}
        <Button>
          {'Обновить таблицу'}
        </Button>
        <div className={s.title}>
          <Typography variant={'body24'} weight={'bold'}>{groupName}</Typography>
        </div>
      </div>
      <StudentsTable tasks={tasks} usersIds={users} answers={answers} />
    </div>
  );
};

export default StudentsTableComponent;