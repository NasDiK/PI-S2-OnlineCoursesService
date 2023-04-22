import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  a: number,
  b: number,
  c: number,
  t: number,
  y: number,
  j: number
) {
  return {name, calories, fat, carbs, protein, a, b, c, t, y, j};
}

const rows = [
  createData('Frozen1 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen2 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen3 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen4 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen5 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen6 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen78 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen 9yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen22 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen5 y5oghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen4 5yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen1 2yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen y1o2ghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Froze1n yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen23 yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3),
  createData('Frozen 1yoghurt', 159, 6.0, 24, 4.0, 5.0, 3, 5, 4.0, 5.0, 3)
];

// eslint-disable-next-line react/function-component-definition
export default function StudentsTable() {
  return (
    <TableContainer sx={{maxHeight: 440, maxWidth: 900}} component={Paper}>
      <Table sx={{maxWidth: 100}} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>{'Dessert'}{'(100g serving)'}</TableCell>
            <TableCell align='right'>{'Calories'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
