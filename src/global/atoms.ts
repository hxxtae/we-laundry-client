import { atom } from 'recoil';

import { fetchCsrfToken } from '../App';
import { AuthService, HttpClient, AddressService } from '../services';
import { mainDescStorage, openStorage, themeStorage } from '../util';

const baseURL = process.env.REACT_APP_BASE_URL!;
const httpClient = new HttpClient(baseURL, () => fetchCsrfToken());
const authService = new AuthService(httpClient);
const addressService = new AddressService(httpClient);

const localTheme = themeStorage.get();
const localDesc = mainDescStorage.get();
const localOpen = openStorage.get();

export const authApi = atom<AuthService>({
  key: 'authFetch',
  default: authService
});

export const addressApi = atom<AddressService>({
  key: 'addressFetch',
  default: addressService
});

export const themeState = atom<boolean>({
  key: 'theme',
  default: !!localTheme,
});

export const userState = atom<string | undefined>({
  key: 'user',
  default: undefined,
});

export const sidebarState = atom<boolean>({
  key: 'sidebar',
  default: true,
});

export const sidebarClickState = atom({
  key: 'sidebarClick',
  default: '',
})

export const descState = atom<boolean>({
  key: 'mainDesc',
  default: !!localDesc,
});

export const openState = atom<boolean>({
  key: 'open',
  default: !!localOpen,
});
