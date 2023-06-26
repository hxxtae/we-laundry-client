import { useQuery } from 'react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { IRecordObjResponse, IRecordSearchRequest } from '../../services/records';
import { recordRequestState, recordsApi } from '../../global';
import { toastStyle } from '../../styles';
import { queryKeys } from '../../util';
import { useEffect } from 'react';
import { dateToString } from '../../components/DateComponent';

interface IHistoryFetch {
  historyLoading: boolean;
  reHistoryLoading: boolean;
  historyDatas: IRecordObjResponse[];
}

export const useHistoryFetch = ({ recordDate: startDate, recordDateKind, addname, dong, ho }: IRecordSearchRequest): IHistoryFetch => {
  const recordsService = useRecoilValue(recordsApi);
  const setRecordState = useSetRecoilState(recordRequestState);
  const resetRecordState = useResetRecoilState(recordRequestState);

  // NOTE: get endDate function
  const onSetEndDate = (str: string): string => {
    const [num, kind] = [...str];
    const kinds = ["y", "m", "d"];
    const idx = kinds.indexOf(kind);
    const prevDate = new Date(startDate);
    const currDate = new Date(startDate);

    if (idx === 0) currDate.setFullYear(currDate.getFullYear() - +num);
    if (idx === 1) currDate.setMonth(currDate.getMonth() - +num);
    if (idx === 2) currDate.setDate(currDate.getDate() - +num);

    const prevDay = prevDate.getDate();
    const currDay = currDate.getDate();
    if (idx === 0 || idx === 1) {
      if (prevDay !== currDay) {
        const newDate = new Date(currDate.getFullYear(), currDate.getMonth(), 0);
        return dateToString(newDate);
      }
    }
    return dateToString(currDate);
  }

  const onSearchConfirm = () => {
    if (!startDate) {
      return {
        queryKey: queryKeys.records.listDongHo(addname, dong, ho),
        queryFn: () => recordsService.searchRecordByCustomer({addname, dong, ho})
      }
    }
    return {
      queryKey: queryKeys.records.listDate(startDate, onSetEndDate(recordDateKind)),
      queryFn: () => recordsService.searchRecordByDate(startDate, onSetEndDate(recordDateKind)),
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

    const { id, recordDate, recordCount, recordPrice, recordSale, recordSalePrice, cusid, addid, addname, addfullname, dong, ho, records } = fetchDatas[0];
    setRecordState((prevObj) => ({
      ...prevObj,
      id,
      recordDate,
      recordCount,
      recordPrice,
      recordSale,
      recordSalePrice,
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
