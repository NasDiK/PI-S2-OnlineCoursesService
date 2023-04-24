import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface iProps{
  // eslint-disable-next-line
  tasks?: any,
  // eslint-disable-next-line
  usersIds?: any,
  // eslint-disable-next-line
  answers?: any
}
const StudentsTable = (props: iProps) => {
  const {tasks, usersIds, answers} = props;
  let studentsComponent, answersComponent, answerCell = [<TableCell key={'start'} />];
  const tasksComponent = [
    <TableCell
      key={'start'}
      sx={{minWidth: 200}}
    >{''}
    </TableCell>
  ];

  if (tasks !== undefined && tasks.length > 1) {
    studentsComponent = usersIds?.map((student) => {
      let completedTasks = 0;

      answersComponent = tasks?.map((task) => {
        answerCell = [];
        // eslint-disable-next-line max-nested-callbacks,array-callback-return
        answers?.map((answer) => {
          if (answer.user_id === student.id && answer.task_id === task.id) {
            let valueAnswer;

            if (answer.value === 'false') {
              valueAnswer = '0';
            } else if (answer.note !== null) {
              valueAnswer = answer.note;
            } else {
              valueAnswer = 'Сдано';
            }
            answerCell.push(
              <TableCell
                key={student.id + answer.task_id + answer.user_id}
                align='center'
              >{valueAnswer}
              </TableCell>
            );
            completedTasks++;
          }
        });
        if (answerCell.length) {
          return answerCell;
        }

        if (task.id === 999) {
          return (
            <TableCell
              key={student.id + task.id + completedTasks}
              align='center'
            >{`${completedTasks / (tasks.length - 1) * 100}%`}
            </TableCell>
          );
        }

        return (
          <TableCell
            key={student.id + task.id}
            align='center'
          >{''}
          </TableCell>
        );
      });

      return (
        <TableRow key={student.fullname} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
          <TableCell component='th' scope='row'>{student.fullname}
          </TableCell>
          {answersComponent}
        </TableRow>
      );
    });
  }
  if (tasks !== undefined && tasks?.length > 1) {
    tasks?.map((task) =>
      tasksComponent.push(
        <TableCell
          sx={{fontWeight: 600}}
          align='center'
          key={task.title}
        >{task.title}
        </TableCell>
      ));
  } else {
    tasksComponent.pop();
  }

  return (
    <TableContainer sx={{maxHeight: 770, maxWidth: 'auto'}} component={Paper}>
      <Table stickyHeader={true} sx={{maxWidth: 'auto'}} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {tasksComponent}
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsComponent}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;