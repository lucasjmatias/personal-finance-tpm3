import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import PageTemplate from '../components/PageTemplate';
import MonthYearSelect from '../components/MonthYearSelect';
import ExpensesTable from '../components/ExpensesTable';
import { formatMoney } from '../utils/number-utils';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ExpensesSummary from '../components/ExpensesSummary';
import {
  useExpenses,
  useExpensesMonth,
  useExpensesTab,
} from '../hooks/ExpensesHook';
import { useParams } from 'react-router-dom';

export default function ExpensesPage() {
  let { currentYearMonth } = useParams();
  const { monthExpenses, totalExpenses, expensesByCategory } =
    useExpenses(currentYearMonth);
  const { tab, handleChangeTab } = useExpensesTab();
  const { availableMonths, handleMonthChange } = useExpensesMonth();

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
              <TabPanel value="1">
                <ExpensesSummary expensesByCategory={expensesByCategory} />
              </TabPanel>
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
