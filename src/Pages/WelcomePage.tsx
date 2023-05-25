import { Button, Paper } from '@mui/material';
import MonetizationOnRounded from '@mui/icons-material/MonetizationOnRounded';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import PageTemplate from '../Components/PageTemplate';

export default function WelcomePage() {
  const navigate = useNavigate();

  function handleGoToMyFinances() {
    navigate('/expenses');
  }

  return (
    <PageTemplate>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={6}
          sx={{
            padding: '50px',
            textAlign: 'center',
            height: '80vh',
          }}
        >
          <p>Welcome! To check your finances, click the button bellow:</p>
          <Button onClick={handleGoToMyFinances} variant="contained">
            <MonetizationOnRounded sx={{ mr: 2 }} /> Check your finances
          </Button>
        </Paper>
      </Container>
    </PageTemplate>
  );
}
