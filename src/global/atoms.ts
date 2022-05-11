import { atom } from 'recoil';

import { fetchCsrfToken } from '../App';
import { AuthService, HttpClient } from '../services';

const baseURL = process.env.REACT_APP_BASE_URL!;
const httpClient = new HttpClient(baseURL, () => fetchCsrfToken());
const authService = new AuthService(httpClient);

const localTheme = localStorage.getItem('theme');

export const authApi = atom<AuthService>({
  key: 'fetch',
  default: authService
});

export const themeState = atom({
  key: 'theme',
  default: !!localTheme,
});

export const userState = atom<string | undefined>({
  key: 'user',
  default: undefined,
});

export const sidebarState = atom({
  key: 'sidebar',
  default: true,
});
