/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {Table, TableRow, TableHead, TableContainer, TableBody, Paper, TableCell}
  from '@mui/material';
import s from './Rating.module.scss';
import {getAllLogs} from '../../../api/tasks';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersByIds} from '../../../api/users';
import {Button, Typography} from '../../shared';
const RatingPageView = () => {
  const dispatch = useDispatch();
  const usersIds = useSelector((stores: any) => stores.ratingStore.usersIds);
  const usersRating = useSelector((stores: any) => stores.ratingStore.usersRating);

  useEffect(() => {
    getAllLogs().then((answersList) => {
      dispatch({type: 'SET_ANSWERS', payload: answersList});
    });
  }, []);

  useEffect(() => {
    getUsersByIds(usersIds).then((usersList) => {
      dispatch({type: 'SET_USERS', payload: usersList});
    });
  }, [usersIds]);

  const upload = () => {
    getAllLogs().then((answersList) => {
      dispatch({type: 'SET_ANSWERS', payload: answersList});
    });

    getUsersByIds(usersIds).then((usersList) => {
      dispatch({type: 'SET_USERS', payload: usersList});
    });
  };

  return (
    <div className={s.body}>
      <div className={s.head}>
        <div className={s.text}>
          <Typography variant={'body24'} weight={'bold'}>{'Рейтинг всех студентов'}</Typography>
        </div>
        <div>
          <Button onClick={upload}>{'Обновить таблицу'}</Button>
        </div>
      </div>
      <div>
        <TableContainer
          className={s.table}
          sx={{maxHeight: 770, maxWidth: 'auto'}}
          component={Paper}
        >
          <Table stickyHeader={true} sx={{maxWidth: 'auto'}} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 600}} align='center'>{''}</TableCell>
                <TableCell sx={{fontWeight: 600}} align='center'>{'Студент'}</TableCell>
                <TableCell sx={{fontWeight: 600}} align='center'>{'Количество выполненных задач'}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                usersRating.map((user, i) => (
                  <TableRow
                    key={user.user}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell key={user.user + i} align='center'>{i + 1}</TableCell>
                    <TableCell key={user.user} align='center'>{user.user}</TableCell>
                    <TableCell key={user.count} align='center'>{user.count}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RatingPageView;