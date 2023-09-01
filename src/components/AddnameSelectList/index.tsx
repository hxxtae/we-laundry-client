import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { IAddressResponse } from '../../services/address';
import { useAddressFetch } from '../../hooks';
import { LoadingItem } from '../index';
import * as S from './style';

interface IAddnameSelectList {
  selectAct: boolean;
  onSelectClick: (addid: string, addname: string, addfullname: string) => void;
}

function AddnameSelectList({ selectAct, onSelectClick }: IAddnameSelectList) {
  const [selectChk, setSelectChk] = useState('');
  const { loading, addDatas } = useAddressFetch();

  const onClick = (addid: string, addname: string, addfullname: string) => {
    onSelectClick(addid, addname, addfullname);
    setSelectChk(addid);
  }

  return (
    <AnimatePresence>
      {selectAct &&
        <S.SelectBox variants={S.motionSelect} initial="init" animate="start" exit="end">
          {loading ? <LoadingItem size='2x'/> :
            addDatas?.map((item: IAddressResponse) => (
            <S.SelectItem
              key={item.id}
              chk={item.id === selectChk ? 'true' : 'false'}
              onClick={() => onClick(item.id, item.addname, item.addfullname)}>
              {item.addname}
            </S.SelectItem>
          ))}
        </S.SelectBox>}
    </AnimatePresence>
  )
}

export default AddnameSelectList;
