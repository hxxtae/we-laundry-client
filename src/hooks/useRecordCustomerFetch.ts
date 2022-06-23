import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { IRecordSearchRequestByAdd } from '../services/records';
import { ICustomerResponse } from '../services/customer';
import { customerApi } from '../global';
import { toastStyle } from '../styles';
import { queryKeys } from '../util';

interface ICustomerFetch {
  loading: boolean;
  reLoading: boolean;
  cusDatas: ICustomerResponse[];
  refetch: () => void;
  status: string;
}

export const useRecordCustomerFetch = ({addname, dong, ho}: IRecordSearchRequestByAdd): ICustomerFetch => {
  const customerService = useRecoilValue(customerApi);

  const {
    isLoading: loading,
    isFetching: reLoading,
    data: cusDatas,
    refetch,
    status,
  } = useQuery(queryKeys.customer.checkDongHo(addname, dong, ho), () => customerService.searchFetchCus({ addname, dong, ho }), {
    enabled: !!addname, // 조건에 따른 query 동작(false: fetcing X)
    cacheTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    },
  });

  return { loading, reLoading, cusDatas: cusDatas?.data, refetch, status };
}
