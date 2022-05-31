import { atom } from 'recoil';
import { IAddressRequest } from '../services/address';
import { ICustomerRequest } from '../services/customer';

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