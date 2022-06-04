import { atom } from 'recoil';

import { fetchCsrfToken } from '../App';
import { AuthService, HttpClient, AddressService, CustomerService, ProductsService } from '../services';
import { mainDescStorage, openStorage, themeStorage } from '../util';

const baseURL = process.env.REACT_APP_BASE_URL!;
const httpClient = new HttpClient(baseURL, () => fetchCsrfToken());
const authService = new AuthService(httpClient);
const addressService = new AddressService(httpClient);
const customerService = new CustomerService(httpClient);
const productsService = new ProductsService(httpClient);

const localTheme = themeStorage.get();
const localDesc = mainDescStorage.get();
const localOpen = openStorage.get();

export const authApi = atom<AuthService>({
  key: 'authApi',
  default: authService
});

export const addressApi = atom<AddressService>({
  key: 'addressApi',
  default: addressService
});

export const customerApi = atom<CustomerService>({
  key: 'customerApi',
  default: customerService
});

export const productsApi = atom<ProductsService>({
  key: 'productsApi',
  default: productsService
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

export const productUpdState = atom<boolean>({
  key: 'productUpd',
  default: false,
});
