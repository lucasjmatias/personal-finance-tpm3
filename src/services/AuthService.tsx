import { apiFetchUser, apiLogin, apiLogout } from '../integration/AuthApi';

export async function login(email: string, password: string) {
  return await apiLogin(email, password);
}

export async function getCurrentUser() {
  return await apiFetchUser();
}

export async function logout() {
  return await apiLogout();
}
