import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Password from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import { login } from '../services/AuthService';
import { getErrorMessage } from '../utils/error-utils';
import { anonymousUser, useAuthContext } from '../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { onSignIn, user } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    (async () => {
      try {
        const user = await login(username, password);
        setError('');
        onSignIn(user);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      }
    })();
  };

  useEffect(() => {
    if (user !== anonymousUser) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <form onSubmit={onSubmit}>
      <Container
        sx={{
          '& > :not(style)': { m: 1, width: '20vw' },
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {error ? <Alert severity="error">{error}</Alert> : ''}
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={handleUsername}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Password />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Button variant="contained" type="submit" color="primary">
          Sign in
        </Button>
      </Container>
    </form>
  );
}
