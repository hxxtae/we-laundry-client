import { atom } from 'recoil';
import { IAddressRequest } from '../services/address';
import { ICustomerRequest } from '../services/customer';
import { IProductRequest } from '../services/products';
import { IRecordRequest } from '../services/records';

export const customerRequestState = atom<ICustomerRequest>({
  key: 'customerRequest',
  default: {
    id: '',
    addid: '',
    addname: '',
    addfullname: '',
    name: '',
    dong: '',
    ho: '',
  }
});

export const addressRequestState = atom<IAddressRequest>({
  key: 'addressRequest',
  default: {
    id: '',
    addname: '',
    addfullname: '',
  }
});

export const productRequestState = atom<IProductRequest>({
  key: 'productRequest',
  default: {
    productId: '',
    productName: '',
    price: 0,
    index: -1,
  }
});

export const recordRequestState = atom<IRecordRequest>({
  key: 'recordRequest',
  default: {
    id: '',
    recordCount: 0,
    recordPrice: 0,
    cusid: '',
    addid: '',
    addname: '',
    dong: '',
    ho: '',
    addfullname: '',
    laundry: [],
    repair: [],
  }
})