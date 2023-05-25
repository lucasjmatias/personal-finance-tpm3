import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import PageTemplate from '../Components/PageTemplate';

export default function ExpensesPage() {
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
        ></Paper>
      </Container>
    </PageTemplate>
  );
}
