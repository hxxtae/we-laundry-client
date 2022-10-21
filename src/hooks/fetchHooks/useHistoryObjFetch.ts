import { useQuery } from 'react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { IRecordObjResponse, IRecordSearchRequest } from '../../services/records';
import { recordRequestState, recordsApi } from '../../global';
import { toastStyle } from '../../styles';
import { queryKeys } from '../../util';
import { useEffect } from 'react';

interface IHistoryFetch {
  historyLoading: boolean;
  reHistoryLoading: boolean;
  historyDatas: IRecordObjResponse[];
}

export const useHistoryFetch = ({ recordDate, addname, dong, ho }: IRecordSearchRequest): IHistoryFetch => {
  const recordsService = useRecoilValue(recordsApi);
  const setRecordState = useSetRecoilState(recordRequestState);
  const resetRecordState = useResetRecoilState(recordRequestState);

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
    isLoading: historyLoading,
    isFetching: reHistoryLoading,
    data: fetchDatas,
  } = useQuery(onSearchConfirm().queryKey, onSearchConfirm().queryFn, {
    staleTime: 1000 * 60 * 10, // 10분
    cacheTime: 1000 * 60 * 10, // 10분
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    },
    select: (data) => {
      return data ? data.data : [];
    }
  });

  useEffect(() => {
    if (historyLoading || reHistoryLoading) {
      return;
    }

    if (!(fetchDatas?.length)) {
      resetRecordState();
      return;
    }

    const { id, recordDate, recordCount, recordPrice, cusid, addid, addname, addfullname, dong, ho, records } = fetchDatas[0];
    setRecordState((prevObj) => ({
      ...prevObj,
      id,
      recordDate,
      recordCount,
      recordPrice,
      cusid,
      addid,
      addname,
      addfullname,
      dong,
      ho,
      laundry: records.laundry,
      repair: records.repair,
    }));
  }, [fetchDatas]);

  return { historyLoading, reHistoryLoading, historyDatas: fetchDatas };
}
