import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import PageTemplate from '../components/PageTemplate';
import React, { useEffect, useState } from 'react';
import {
  getAvailableMonths,
  getExpensesFromMonth,
} from '../services/ExpensesService';
import MonthYear from '../integration/entities/MonthYear';
import MonthYearSelect from '../components/MonthYearSelect';
import ExpensesTable from '../components/ExpensesTable';
import { yearMonthStrToMonthYear } from '../integration/converters/MonthYearConverters';
import Expense from '../integration/entities/Expense';
import { formatMoney, reduceSumProperties } from '../utils/number-utils';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function ExpensesPage() {
  const navigate = useNavigate();
  let { currentYearMonth } = useParams();

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
      if (!currentYearMonth) {
        setMonthExpenses([]);
        setTotalExpenses(0);
        return;
      }
      const monthYear = yearMonthStrToMonthYear(currentYearMonth);
      const curMonthExpenses = await getExpensesFromMonth(monthYear);
      setMonthExpenses(curMonthExpenses);
      const totalExpenseCalc = curMonthExpenses.reduce(
        reduceSumProperties('valor'),
        0
      );
      setTotalExpenses(totalExpenseCalc);
    })();
  }, [currentYearMonth]);

  const [tab, setTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  function handleMonthChange(newMonthYear: string) {
    navigate(`/expenses/${newMonthYear}`);
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
            value={currentYearMonth}
            onChange={handleMonthChange}
          />
          Total expenses: {formatMoney(totalExpenses)}
          <Box sx={{ width: '100%' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab} aria-label="Expenses data">
                  <Tab label="Summary" value="1" />
                  <Tab label="Complete" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">Summary</TabPanel>
              <TabPanel value="2">
                <ExpensesTable expenses={monthExpenses} />
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </Container>
    </PageTemplate>
  );
}
