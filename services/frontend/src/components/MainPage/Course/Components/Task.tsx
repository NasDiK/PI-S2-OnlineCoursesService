import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';

export interface iTask {
  id: number
}

const Task = () => {
  const [task, setTask] = useState<iTask>();
  const [match] = useMatches();

  useEffect(() => {
    const taskId = Number(match.params.taskId);

    // eslint-disable-next-line no-console
    console.log(taskId);

    setTask({id: taskId});
  }, [match.pathname]);

  return <div>{`Task ${task?.id}`}</div>;
};

export default Task;