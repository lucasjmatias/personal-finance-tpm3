import { handleFetchResponse } from '../utils/api-utils';
import User from './entities/User';

const baseURL = 'http://localhost:3001';

export async function apiLogin(email: string, password: string): Promise<User> {
  const response = await fetch(`${baseURL}/sessao/criar`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha: password }),
  });
  return handleFetchResponse(response);
}

export async function apiFetchUser(): Promise<User> {
  const response = await fetch(`${baseURL}/sessao/usuario`, {
    credentials: 'include',
  });
  return handleFetchResponse(response);
}

export async function apiLogout(): Promise<User> {
  const response = await fetch(`${baseURL}/sessao/finalizar`, {
    credentials: 'include',
    method: 'POST',
  });
  return handleFetchResponse(response);
}
