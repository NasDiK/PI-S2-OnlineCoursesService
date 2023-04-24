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
  let tasksComponent, studentsComponent, answersComponent;

  if (tasks !== undefined) {
    tasksComponent = tasks?.map((task) => (
      <TableCell
        align='center'
        key={task.title}
      >{task.title}
      </TableCell>
    ));
    studentsComponent = usersIds?.map((student) => {
      answersComponent = answers?.map((answer) => {
        if (answer.user_id !== student.id) {
          return <TableCell key={student + answer.task_id} align='center'>{''}</TableCell>;
        }
        let valueAnswer;

        if (answer.value === 'false') {
          valueAnswer = '0';
        } else if (answer.note !== null) {
          valueAnswer = answer.note;
        } else {
          valueAnswer = 'Сдано';
        }

        return (<TableCell key={student + answer.task_id} align='center'>{valueAnswer}</TableCell>);
      });

      return (
        <TableRow key={student.fullname} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
          <TableCell component='th' scope='row'>{student.fullname}</TableCell>
          {answersComponent}
        </TableRow>
      );
    });
  }

  return (
    <TableContainer sx={{maxHeight: 770, maxWidth: 'auto'}} component={Paper}>
      <Table stickyHeader={true} sx={{maxWidth: 'auto'}} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{minWidth: 200}}>{'Студенты'}</TableCell>
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
