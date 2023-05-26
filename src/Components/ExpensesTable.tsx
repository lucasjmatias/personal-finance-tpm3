import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Expense from '../integration/entities/Expense';
import { formatMoney } from '../utils/number-utils';

interface Props {
  expenses?: Expense[];
}

export default function BasicTable({ expenses = [] }: Props) {
  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      {expenses.length ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expenses</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Day</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(({ id, descricao, categoria, dia, valor }) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {descricao}
                </TableCell>
                <TableCell align="right">{categoria}</TableCell>
                <TableCell align="right">{dia}</TableCell>
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
}
