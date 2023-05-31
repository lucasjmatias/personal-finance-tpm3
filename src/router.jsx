import { Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ExpensesPage from './pages/ExpensesPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequiredAuth';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/expenses/:currentYearMonth?"
        element={
          <RequireAuth>
            <ExpensesPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
