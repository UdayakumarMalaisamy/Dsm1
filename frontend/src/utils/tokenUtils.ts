export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'auth_user';

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const setRefreshToken = (refreshToken: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setUser = (user: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): any | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

export const clearAuthData = (): void => {
  removeToken();
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('role');
  localStorage.removeItem('userRole');
};
