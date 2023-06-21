import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

import { scroll, selectStyle } from '../styles';
import { IAddressResponse } from '../services/address';
import { useAddressFetch } from '../hooks';
import { LoadingItem } from './index';

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
        <SelectBox variants={selectVariant} initial="init" animate="start" exit="end">
          {loading ?
              <LoadingItem /> :
            addDatas?.map((item: IAddressResponse) => (
            <SelectItem
              key={item.id}
              chk={item.id === selectChk ? 'true' : 'false'}
              onClick={() => onClick(item.id, item.addname, item.addfullname)}>
              {item.addname}
            </SelectItem>
          ))}
        </SelectBox>}
    </AnimatePresence>
  )
}

export default AddnameSelectList;

// NOTE: motion effect object
const selectVariant = {
  init: {
    height: 0,
  },
  start: {
    height: "auto",
    transition: {
      type: 'tween',
    }
  },
  end: {
    height: 0,
    opacity: 0,
    border: 0,
  }
}

const SelectBox = styled(motion.ul)`
  ${selectStyle.select(40)}
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  ${({ theme }) => scroll.custom(8, theme.borderColorSub, theme.textColor)}
`;

const SelectItem = styled(motion.li) <{ chk: string }>`
  ${selectStyle.option()}
  background-color: ${({ theme, chk }) => chk === 'true' ? theme.borderColor : 'transparent' };
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: ${(props) => props.theme.borderColor};
  }
`;
