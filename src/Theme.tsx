import { ReactNode, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface Props {
  children?: ReactNode;
}

export default function Theme({ children }: Props) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            light: '#b3e3f6',
            main: '#1a83c0',
            dark: '#10538a',
            contrastText: '#fff',
          },
          secondary: {
            light: '#bfdde8',
            main: '#2f678d',
            dark: '#224b6d',
            contrastText: '#000',
          },
        },
      }),
    []
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
