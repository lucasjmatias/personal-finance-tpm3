import Expense from '../entities/Expense';
import MonthYear from '../entities/MonthYear';

export function expenseToMonthYear(expense: Expense): MonthYear {
  return yearMonthStrToMonthYear(expense.mes);
}

export function yearMonthStrToMonthYear(yearMonth: string): MonthYear {
  const [yearText, monthText] = yearMonth.split('-');
  const month = parseInt(monthText);
  const year = parseInt(yearText);
  const dateValue = new Date(year, month - 1);
  return {
    month,
    year,
    dateValue,
  };
}
