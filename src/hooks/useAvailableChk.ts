import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLayoutEffect, useState } from 'react';

import { recordReceiptExeState, recordRequestState } from '../global';
import { ICustomerResponse } from '../services/customer';

type IAvailableChk = {
  cusDatas: ICustomerResponse[];
}

export const useAvailableChk = ({ cusDatas }: IAvailableChk) => {
  const [availableChk, setAvailableChk] = useState(false);     // 검색 결과 유효확인 state
  const receiptExeChk = useRecoilValue(recordReceiptExeState); // 접수 완료 확인 state
  const setRecordState = useSetRecoilState(recordRequestState);

  useLayoutEffect(() => {
    const customerObj = cusDatas?.length ?
      {
        addid: cusDatas[0].addid,
        cusid: cusDatas[0].id,
        addname: cusDatas[0].addname,
        dong: cusDatas[0].dong,
        ho: cusDatas[0].ho,
        addfullname: cusDatas[0].addfullname,
      } : {
        addid: '',
        cusid: '',
        addname: '',
        dong: '',
        ho: '',
        addfullname: '',
      };
    
    setRecordState((prev) => ({
      ...prev,
      ...customerObj,
    }));

    if (cusDatas?.length) {
      setAvailableChk(true);
    } else {
      setAvailableChk(false);
    }
  }, [cusDatas]);

  useLayoutEffect(() => {
    if (receiptExeChk) {
      setAvailableChk(false);
    }
  }, [receiptExeChk]);

  return availableChk;
}


