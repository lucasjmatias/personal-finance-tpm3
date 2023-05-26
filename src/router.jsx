import { createBrowserRouter } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import ExpensesPage from './Pages/ExpensesPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/expenses/:mes?',
    element: <ExpensesPage />,
  },
]);

export default router;
