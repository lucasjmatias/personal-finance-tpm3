import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatMoney } from '../utils/number-utils';
import React from 'react';

interface Props {
  expensesByCategory?: [string, number][];
}

export default React.memo(function ExpensesSummary({
  expensesByCategory = [],
}: Props) {
  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      {expensesByCategory.length ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesByCategory.map(([categoria, valor]) => (
              <TableRow
                key={categoria}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {categoria}
                </TableCell>
                <TableCell align="right">{formatMoney(valor)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        'No expenses found'
      )}
    </TableContainer>
  );
});
