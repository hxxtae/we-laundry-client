import { atom } from 'recoil';

import { fetchCsrfToken } from '../App';
import { AuthService, HttpClient, AddressService, CustomerService, ProductsService } from '../services';
import RecordsService, { IRecordsOflaundry, IRecordsOfRepair } from '../services/records';
import { mainDescStorage, openStorage, themeStorage } from '../util';

const baseURL = process.env.REACT_APP_BASE_URL!;
const httpClient = new HttpClient(baseURL, () => fetchCsrfToken());
const authService = new AuthService(httpClient);
const addressService = new AddressService(httpClient);
const customerService = new CustomerService(httpClient);
const productsService = new ProductsService(httpClient);
const recordsService = new RecordsService(httpClient);

const localTheme = themeStorage.get();
const localDesc = mainDescStorage.get();
const localOpen = openStorage.get();

/*
===================
  Api.
===================
*/
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

export const recordsApi = atom<RecordsService>({
  key: 'recordsApi',
  default: recordsService
});

/*
===================
  Main.
===================
*/
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

/*
===================
  Page Products.
===================
*/
export const productUpdState = atom<boolean>({
  key: 'productUpd',
  default: false,
});

export const productDelState = atom<boolean>({
  key: 'productDel',
  default: false,
});

export const productPopupState = atom<boolean>({
  key: 'productPopup',
  default: false,
});

/*
===================
  Page Records.
===================
*/
export const recordLaundryState = atom<IRecordsOflaundry[]>({
  key: 'recordLaundry',
  default: [],
});

export const recordRepairState = atom<IRecordsOfRepair[]>({
  key: 'recordRepair',
  default: [],
});

export const recordReceiptExeState = atom<boolean>({
  key: 'recordReceiptExe',
  default: false,
});

