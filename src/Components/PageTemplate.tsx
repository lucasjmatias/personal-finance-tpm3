import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DenseAppBar from './DenseAppBar';

interface Props {
  children?: ReactNode;
}

export default function PageTemplate({ children }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <DenseAppBar />
        {children}
      </Box>
    </Box>
  );
}
