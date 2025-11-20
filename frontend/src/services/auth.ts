export interface User {
  id: string;
  email: string;
  role: 'customer' | 'admin';
}
export interface AuthResponse {
  token: string;
  user: User;
}

const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'auth_role';

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  const data: AuthResponse = await res.json();
  storeAuth(data.token, data.user.role);
  return data;
}

export async function signup(email: string, password: string, role: 'customer' | 'admin'): Promise<AuthResponse> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Signup failed (${res.status}) ${text}`);
  const data = JSON.parse(text);
  storeAuth(data.token, data.user.role);
  return data;
}

function storeAuth(token: string, role: User['role']) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole(): User['role'] | null {
  return localStorage.getItem(ROLE_KEY) as User['role'] | null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}