import { atom } from 'recoil';
import { IAddressRequest } from '../services/address';
import { ICustomerRequest } from '../services/customer';
import { IProductRequest } from '../services/products';

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
