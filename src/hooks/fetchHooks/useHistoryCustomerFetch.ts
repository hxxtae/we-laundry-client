import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { recordsApi } from '../../global';
import { IRecordObjResponse, IRecordSearchRequestByDongAndHo } from '../../services/records';
import { toastStyle } from '../../styles';
import { queryKeys } from '../../util';

interface IHistoryCustomerFetch {
  loadingCus: boolean;
  reLoadingCus: boolean;
  hisDatas: IRecordObjResponse[];
}

export const useHistoryCustomerFetch = ({addname, dong, ho}: IRecordSearchRequestByDongAndHo): IHistoryCustomerFetch => {
  const recordsService = useRecoilValue(recordsApi);

  const {
    isLoading: loadingCus,
    isFetching: reLoadingCus,
    data: hisDatas,
  } = useQuery(queryKeys.records.listDongHo(addname, dong, ho), () => recordsService.searchRecordByCustomer({addname, dong, ho}), {
    enabled: !!addname,
    staleTime: 1000 * 60 * 10, // 10분
    cacheTime: 1000 * 60 * 10, // 10분
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  return { loadingCus, reLoadingCus, hisDatas: hisDatas?.data };
}
