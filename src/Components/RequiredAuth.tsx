import { Navigate, useLocation } from 'react-router-dom';
import { anonymousUser, useAuthContext } from '../context/authContext';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let { user } = useAuthContext();
  let location = useLocation();

  console.log(user);
  if (user === anonymousUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
