/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {Table, TableRow, TableHead, TableContainer, TableBody, Paper, TableCell}
  from '@mui/material';
import {useSelector} from 'react-redux';

const StudentsTable = () => {
  const tasks = useSelector(({studentsStore}: any) => studentsStore.tasks);
  const students = useSelector(({studentsStore}: any) => studentsStore.users);
  const answers = useSelector(({studentsStore}: any) => studentsStore.answers);

  return (
    <TableContainer sx={{maxHeight: 770, maxWidth: 'auto'}} component={Paper}>
      <Table stickyHeader={true} sx={{maxWidth: 'auto'}} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {
              tasks.map((task) => (
                <TableCell
                  sx={{fontWeight: 600}}
                  align='center'
                  key={task.title}
                >{task.title}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            students?.map((student) => (
              <TableRow
                key={student.fullname}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component='th' scope='row'>{student.fullname}</TableCell>
                {
                  answers?.filter((answer) => answer.user_id === student.id)
                    .map((answer) => (
                      <TableCell
                        key={`${student.id} + ${answer.id} + ${answer.user_id} + ${answer.task_id}`}
                        align='center'
                      >{answer.value}
                      </TableCell>
                    ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;