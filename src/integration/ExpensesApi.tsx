import { handleFetchResponse } from '../utils/api-utils';
import { yearMonthISO } from '../utils/date-utils';
import Expense from './entities/Expense';
import MonthYear from './entities/MonthYear';

const baseURL = 'http://localhost:3001';

export async function apiFetchAllExpenses(): Promise<Expense[]> {
  const response = await fetch(`${baseURL}/despesas`, {
    credentials: 'include',
  });
  return handleFetchResponse(response);
}

export async function apiFetchExpensesFromMonth({
  year,
  month,
}: MonthYear): Promise<Expense[]> {
  const response = await fetch(
    `${baseURL}/despesas?mes=${yearMonthISO(year, month)}&_sort=dia`,
    {
      credentials: 'include',
    }
  );
  return handleFetchResponse(response);
}
