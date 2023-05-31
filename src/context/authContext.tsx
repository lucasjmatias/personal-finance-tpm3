import User from '../integration/entities/User';
import React, { useContext } from 'react';

export interface AuthContext {
  user: User;
  onSignOut: () => void;
  onSignIn: (user: User) => void;
}

export const anonymousUser = {
  nome: 'Anonymous',
  email: '',
};

export const authContext = React.createContext<AuthContext>({
  user: anonymousUser,
  onSignOut: () => {},
  onSignIn: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}
