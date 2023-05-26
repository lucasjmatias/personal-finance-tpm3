import { compose, descend, map, prop, sortWith, uniq } from 'ramda';
import {
  fetchAllExpenses,
  fetchExpensesFromMonth,
} from '../integration/ExpensesApi';
import MonthYear from '../integration/entities/MonthYear';
import { expenseToMonthYear } from '../integration/converters/MonthYearConverters';
import Expense from '../integration/entities/Expense';

const sortMonthYearDesc = sortWith<MonthYear>([
  descend(prop('year')),
  descend(prop('month')),
]);

export async function getAvailableMonths(): Promise<MonthYear[]> {
  const uniqueMonthsFromExpenses = compose(
    sortMonthYearDesc,
    uniq,
    map(expenseToMonthYear)
  );
  const expenses = await fetchAllExpenses();
  return uniqueMonthsFromExpenses(expenses);
}

export async function getExpensesFromMonth(
  monthYear: MonthYear
): Promise<Expense[]> {
  const expenses = await fetchExpensesFromMonth(monthYear);
  return expenses;
}
