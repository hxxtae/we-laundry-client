import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { customerApi } from '../global';
import { ICustomerRequest, ICustomerResponse } from '../services/customer';
import { toastStyle } from '../styles';

interface ICustomerFetch {
  loading: boolean;
  reLoading: boolean;
  cusDatas: ICustomerResponse[];
  refetch: () => void;
  status: string;
}

export const useCustomerFetch = ({addname, dong, ho}: ICustomerRequest): ICustomerFetch => {
  const customerService = useRecoilValue(customerApi);

  const {
    isLoading: loading,
    isFetching: reLoading,
    data: cusDatas,
    refetch,
    status
  } = useQuery(["/customer", "fetch"], () => customerService.searchFetchCus({ addname, dong, ho }), {
    enabled: !!addname, // 조건에 따른 query 동작(false: fetcing X)
    staleTime: 600000,  // 10분
    cacheTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    },
  });

  return { loading, reLoading, cusDatas: cusDatas?.data, refetch, status };
}

// NOTE: useQuery 의 defaultProps 중 계속 "enabled: false" 면
// 변경된 데이터를 재조회 시 refetch()를 사용한다.
// "enabled: true" 면
// client.invalidateQueries(["/customer", "fetch"]);
// 로 데이터 재조회가 가능하다.
