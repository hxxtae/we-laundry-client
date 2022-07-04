import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { recordsApi } from '../../global';
import { IRecordObjResponse } from '../../services/records';
import { toastStyle } from '../../styles';
import { queryKeys } from '../../util';

interface IHistoryDateFetch {
  loadingDate: boolean;
  reLoadingDate: boolean;
  hisDateDatas: IRecordObjResponse[];
}

export const useHistoryDateFetch = ( recordDate: string): IHistoryDateFetch => {
  const recordsService = useRecoilValue(recordsApi);

  const {
    isLoading: loadingDate,
    isFetching: reLoadingDate,
    data: hisDateDatas,
  } = useQuery(queryKeys.records.listDate(recordDate), () => recordsService.searchRecordByDate(recordDate), {
    enabled: !!recordDate,
    staleTime: 600000, // 10분
    cacheTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  return { loadingDate, reLoadingDate, hisDateDatas: hisDateDatas?.data };
}
