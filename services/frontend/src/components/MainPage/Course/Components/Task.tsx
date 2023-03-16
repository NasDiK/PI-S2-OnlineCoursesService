import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';

interface iValueField {
  type: number; //from enum/task/fieldType,
  options: Array<{id: string; title: string;}>
}

export interface iTask {
  id: number;
  title?: string;
  description?: string;
  'value'?: Array<iValueField>;
  type?: number; //from enum/task
  max_note?: number;
  weight?: number; //todo вынести в панель, отсюда убрать
}

const Task = () => {
  const [task, setTask] = useState<iTask>();
  const [match] = useMatches();

  useEffect(() => {
    const taskId = Number(match.params.taskId);

    setTask({id: taskId});
  }, [match.pathname]);

  return <div>{`Task ${task?.id}`}</div>;
};

export default Task;