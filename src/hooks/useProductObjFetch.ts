import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { productsApi } from '../global';
import { IProductObjResponse } from '../services/products';
import { toastStyle } from '../styles';

export interface ICategoryObj {
  id: string;
  categoryName: string;
}

interface IProductObjFetch {
  loading: boolean;
  reLoading: boolean;
  productObjs: IProductObjResponse[];
}

export const useProductObjFetch = (): IProductObjFetch => {
  const productsService = useRecoilValue(productsApi);
  
  const {
    isLoading: loading,
    isFetching: reLoading,
    data,
    refetch,
  } = useQuery(["/productObj", "fetch"], () => productsService.fetchProductObjs(), {
      staleTime: 1200000,  // 20분
      cacheTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
      onError: (error: any) => {
        toastStyle.error(error.message);
      }
    });
  
  return {
    loading,
    reLoading,
    productObjs: data?.data
  };
}