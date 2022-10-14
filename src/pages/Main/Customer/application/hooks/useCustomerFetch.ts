import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { customerApi, customerSearchState } from '../../../../../global';
import { CustomerDTO } from '../interface';
import { toastStyle } from '../../../../../styles';
import { queryKeys } from '../../../../../util';

interface ICustomerFetch {
  isLoading: boolean;
  isFetching: boolean;
  customerDatas?: CustomerDTO.ICustomerResponse[] | [];
  refetch: () => void;
  status: string;
}

export const useCustomerFetch = (): ICustomerFetch => {
  const customerService = useRecoilValue(customerApi);
  const { addname, dong, ho }: CustomerDTO.ICustomerSearchRequest = useRecoilValue(customerSearchState);

  const {
    isLoading,
    isFetching,
    data,
    refetch,
    status
  } = useQuery(queryKeys.customer.listDongHo(addname, dong, ho), () => customerService.searchFetchCus({ addname, dong, ho }), {
    enabled: !!addname, // 조건에 따른 query 동작(false: fetcing X)
    staleTime: 1000 * 60 * 10, // 10분
    cacheTime: 1000 * 60 * 10, // 10분
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    select: (data) => {
      return data ? data.data : [];
    },
    onError: (error: any) => {
      toastStyle.error(error.message);
    },
  });

  return { isLoading, isFetching, customerDatas: data, refetch, status };
}
