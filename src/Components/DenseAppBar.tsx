import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MonetizationOnRounded from '@mui/icons-material/MonetizationOnRounded';
import { useNavigate } from 'react-router-dom';

export default function DenseAppBar() {
  const navigate = useNavigate();

  function handleGoToHome() {
    navigate('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="money"
            sx={{ mr: 2 }}
            onClick={handleGoToHome}
          >
            <MonetizationOnRounded />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Personal finance
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
