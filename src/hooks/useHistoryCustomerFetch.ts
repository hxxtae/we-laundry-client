import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { recordsApi } from '../global';
import { IRecordObjResponse } from '../services/records';
import { toastStyle } from '../styles';

interface IHistoryCustomerFetch {
  loadingCus: boolean;
  reLoadingCus: boolean;
  hisDatas: IRecordObjResponse[];
}

export const useHistoryCustomerFetch = (addname: string, dong: string, ho?: string): IHistoryCustomerFetch => {
  const recordsService = useRecoilValue(recordsApi);
  const searchKey = () => {
    if (!ho) {
      return `${addname}_${dong}`;
    }
    return `${addname}_${dong}_${ho}`;
  };

  const {
    isLoading: loadingCus,
    isFetching: reLoadingCus,
    data: hisDatas,
  } = useQuery(["/records", "customer_fetch", searchKey()], () => recordsService.searchRecordByCustomer({addname, dong, ho}), {
    enabled: !!addname,
    staleTime: 600000, // 10분
    cacheTime: 600000, // 10분
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  return { loadingCus, reLoadingCus, hisDatas: hisDatas?.data };
}
