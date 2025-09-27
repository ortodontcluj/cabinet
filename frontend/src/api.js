// API helper pentru comunicarea cu backend-ul
export const API_URL = 'http://localhost:3001/api';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
}

export async function fetchWithToken(endpoint, token, options = {}) {
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}
