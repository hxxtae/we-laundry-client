import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { addressApi } from '../global';
import { IAddressResponse } from '../services/address';
import { toastStyle } from '../styles';
import { queryKeys } from '../util';

interface IAddressFetch {
  loading: boolean;
  reLoading: boolean;
  addDatas: IAddressResponse[];
}

export const useAddressFetch = (): IAddressFetch => {
  const addressService = useRecoilValue(addressApi);
  const {
    isLoading: loading,
    isFetching: reLoading,
    data: addDatas
  } = useQuery(queryKeys.address.all, () => addressService.fetchAdd(), {
    staleTime: 1200000, // 20분
    cacheTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });
  return { loading, reLoading, addDatas: addDatas?.data };
}
