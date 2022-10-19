import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { IRecordObjResponse, IRecordSearchRequest } from '../../services/records';
import { recordsApi } from '../../global';
import { toastStyle } from '../../styles';
import { queryKeys } from '../../util';

interface IHistoryDateFetch {
  loadingDate: boolean;
  reLoadingDate: boolean;
  historyDateDatas: IRecordObjResponse[];
}

export const useHistoryDateFetch = ({ recordDate, addname, dong, ho }: IRecordSearchRequest): IHistoryDateFetch => {
  const recordsService = useRecoilValue(recordsApi);

  const onSearchConfirm = () => {
    if (!recordDate) {
      return {
        queryKey: queryKeys.records.listDongHo(addname, dong, ho),
        queryFn: () => recordsService.searchRecordByCustomer({addname, dong, ho})
      }
    }
    return {
      queryKey: queryKeys.records.listDate(recordDate),
      queryFn: () => recordsService.searchRecordByDate(recordDate),
    }
  }

  const {
    isLoading: loadingDate,
    isFetching: reLoadingDate,
    data: fetchDatas,
  } = useQuery(onSearchConfirm().queryKey, onSearchConfirm().queryFn, {
    staleTime: 1000 * 60 * 10, // 10분
    cacheTime: 1000 * 60 * 10, // 10분
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  return { loadingDate, reLoadingDate, historyDateDatas: fetchDatas?.data };
}
