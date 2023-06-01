import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  getAvailableMonths,
  getExpensesFromMonth,
} from '../services/ExpensesService';
import MonthYear from '../integration/entities/MonthYear';
import { yearMonthStrToMonthYear } from '../integration/converters/MonthYearConverters';
import Expense from '../integration/entities/Expense';
import { useNavigate } from 'react-router-dom';
import { reduceSumProperties } from '../utils/number-utils';
import { compose, prop, reduce, sortBy, toPairs } from 'ramda';
import { summarizeExpenses } from '../services/ExpensesService';

export const useExpenses = (currentYearMonth: string | undefined) => {
  const [monthExpenses, setMonthExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const groupByCategory = useMemo(
    () =>
      compose(
        sortBy<[string, number]>(prop(0)),
        toPairs,
        reduce(summarizeExpenses, {})
      ),
    []
  );

  const expensesByCategory = useMemo(
    () => groupByCategory(monthExpenses),
    [groupByCategory, monthExpenses]
  );

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

  return {
    monthExpenses,
    expensesByCategory,
    totalExpenses,
  };
};

export const useExpensesMonth = () => {
  useEffect(() => {
    (async () => {
      const currentAvailableMonths = await getAvailableMonths();
      setAvailableMonths(currentAvailableMonths);
    })();
  }, []);

  const navigate = useNavigate();
  const [availableMonths, setAvailableMonths] = useState<MonthYear[]>([]);

  const handleMonthChange = useCallback(
    (newMonthYear: string) => {
      navigate(`/expenses/${newMonthYear}`);
    },
    [navigate]
  );

  return {
    availableMonths,
    handleMonthChange,
  };
};

export const useExpensesTab = () => {
  const [tab, setTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  return {
    tab,
    handleChangeTab,
  };
};
