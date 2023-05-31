import { useEffect, useState } from 'react';
import User from './integration/entities/User';
import { authContext, anonymousUser } from './context/authContext';
import Router from './router';
import { getCurrentUser, logout } from './services/AuthService';

export default function App() {
  const [user, setUser] = useState<User>(anonymousUser);

  function onSignOut() {
    (async () => {
      try {
        const currentUser = await logout();
        setUser(currentUser);
      } catch (error) {
      } finally {
        setUser(anonymousUser);
      }
    })();
  }

  function onSignIn(user: User) {
    setUser(user);
  }

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(anonymousUser);
      }
    })();
  }, []);

  return (
    <authContext.Provider value={{ user, onSignOut, onSignIn }}>
      <Router />
    </authContext.Provider>
  );
}
