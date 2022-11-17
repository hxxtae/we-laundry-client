import { atom } from 'recoil';
import { CustomerDTO } from '../interface';

export const customerRequestState = atom<CustomerDTO.ICustomerRequest>({
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

export const customerSearchState = atom<CustomerDTO.ICustomerSearchRequest>({
  key: 'customerSearchRequest',
  default: {
    addname: '',
    dong: '',
    ho: '',
  }
});

export const searchState = atom<boolean>({
  key: 'customerSearchActive',
  default: false,
});

export const updateState = atom<boolean>({
  key: 'customerUpdateActive',
  default: false,
});
