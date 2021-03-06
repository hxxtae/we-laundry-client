import { atom } from 'recoil';

import { fetchCsrfToken } from '../App';
import { AuthService, HttpClient, AddressService, CustomerService, ProductsService, SalesService } from '../services';
import RecordsService, { IRecordsOflaundry, IRecordsOfRepair } from '../services/records';
import { mainDescStorage, openStorage, themeStorage } from '../util';

const baseURL = process.env.REACT_APP_BASE_URL!;
const httpClient = new HttpClient(baseURL, () => fetchCsrfToken());
const authService = new AuthService(httpClient);
const addressService = new AddressService(httpClient);
const customerService = new CustomerService(httpClient);
const productsService = new ProductsService(httpClient);
const recordsService = new RecordsService(httpClient);
const salesService = new SalesService(httpClient);

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

export const salesApi = atom<SalesService>({
  key: 'salesApi',
  default: salesService,
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
});

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
export const updateState = atom<boolean>({
  key: 'updateActive',
  default: false,
});

export const deleteState = atom<boolean>({
  key: 'deleteActive',
  default: false,
});

export const searchState = atom<boolean>({
  key: 'searchActive',
  default: false,
});

export const popupState = atom<boolean>({
  key: 'popupActive',
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

