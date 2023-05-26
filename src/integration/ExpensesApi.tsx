import Expense from './entities/Expense';
import MonthYear from './entities/MonthYear';

const baseURL = 'http://localhost:3001';

export async function fetchAllExpenses(): Promise<Expense[]> {
  const response = await fetch(`${baseURL}/despesas`);
  return response.json();
}

export async function fetchExpensesFromMonth({
  year,
  month,
}: MonthYear): Promise<Expense[]> {
  const response = await fetch(
    `${baseURL}/despesas?mes=${year}-${month
      .toString()
      .padStart(2, '0')}&_sort=dia`
  );
  return response.json();
}
