import { atom } from 'recoil';
import { IAddressRequest } from '../services/address';
import { IProductRequest } from '../services/products';
import { IRecordRequest } from '../services/records';

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
    recordDate: '',
    recordCount: 0,
    recordPrice: 0,
    recordSale: 0,
    recordSalePrice: 0,
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