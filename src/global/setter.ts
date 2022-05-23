import { atom } from 'recoil';

export const addressSetter = atom({
  key: 'addressSet',
  default: {
    id: '',
    addname: '',
    addfullname: '',
  }
});
