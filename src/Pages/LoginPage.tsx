import PageTemplate from '../components/PageTemplate';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <PageTemplate>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={6}
          sx={{
            padding: '50px',
            textAlign: 'center',
            minHeight: '80vh',
          }}
        >
          <h2>Login page</h2>
          <LoginForm />
        </Paper>
      </Container>
    </PageTemplate>
  );
}
