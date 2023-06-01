import React, { useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MonthYear from '../integration/entities/MonthYear';
import { identity } from 'ramda';
import { formatDateMonthYear } from '../utils/date-utils';

interface Props {
  monthYears: MonthYear[];
  value?: string;
  onChange?: (value: string) => void;
}

export default React.memo(function MonthYearSelect({
  monthYears,
  value = '',
  onChange = identity,
}: Props) {
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, mb: 2, minWidth: 120 }}>
        <InputLabel id="month-and-year-label">Year and month</InputLabel>
        <Select
          labelId="month-and-year-label"
          id="month-and-year-input"
          value={value}
          onChange={handleChange}
          label="Year and month"
          variant="filled"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {monthYears.map(({ year, month, dateValue }) => (
            <MenuItem
              key={`${year}-${month}`}
              value={`${year}-${month.toString().padStart(2, '0')}`}
            >
              {formatDateMonthYear(dateValue)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select an available year and month</FormHelperText>
      </FormControl>
    </div>
  );
});
