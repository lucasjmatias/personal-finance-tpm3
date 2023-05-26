import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import PageTemplate from '../Components/PageTemplate';
import { useEffect, useState } from 'react';
import {
  getAvailableMonths,
  getExpensesFromMonth,
} from '../services/ExpensesService';
import MonthYear from '../integration/entities/MonthYear';
import MonthYearSelect from '../Components/MonthYearSelect';
import ExpensesTable from '../Components/ExpensesTable';
import { yearMonthStrToMonthYear } from '../integration/converters/MonthYearConverters';
import Expense from '../integration/entities/Expense';
import { formatMoney, reduceSumProperties } from '../utils/number-utils';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExpensesPage() {
  let { mes: selectedYearMonthParam } = useParams();
  const [availableMonths, setAvailableMonths] = useState<MonthYear[]>([]);
  const [monthExpenses, setMonthExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  useEffect(() => {
    (async () => {
      const currentAvailableMonths = await getAvailableMonths();
      setAvailableMonths(currentAvailableMonths);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selectedYearMonthParam) {
        setMonthExpenses([]);
        setTotalExpenses(0);
        return;
      }
      const monthYear = yearMonthStrToMonthYear(selectedYearMonthParam);
      const curMonthExpenses = await getExpensesFromMonth(monthYear);
      setMonthExpenses(curMonthExpenses);
      const totalExpenseCalc = curMonthExpenses.reduce(
        reduceSumProperties('valor'),
        0
      );
      setTotalExpenses(totalExpenseCalc);
    })();
  }, [selectedYearMonthParam]);
  const navigate = useNavigate();

  function handleMonthChange(value: string) {
    (async () => {
      navigate(`/expenses/${value}`);
    })();
  }
  return (
    <PageTemplate>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={6}
          sx={{
            padding: '50px',
            textAlign: 'center',
            minHeight: '80vh',
          }}
        >
          <MonthYearSelect
            monthYears={availableMonths}
            value={selectedYearMonthParam}
            onChange={handleMonthChange}
          ></MonthYearSelect>
          Total expenses: {formatMoney(totalExpenses)}
          <ExpensesTable expenses={monthExpenses} />
        </Paper>
      </Container>
    </PageTemplate>
  );
}
