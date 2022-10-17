import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

import { dragging, includes, scroll } from '../styles';
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
              <ItemText>
                {item.addname}
              </ItemText>
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
  position: absolute;
  top: 40px;
  left: 0;
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  width: 100%;
  max-height: 300px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow-y: auto;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
`;

const SelectItem = styled(motion.li)<{chk: string}>`
  ${dragging.stop}
  width: 100%;
  padding: 10px 16px;
  background-color: ${(props) => props.chk === 'true' ? props.theme.borderColor : 'transparent' };
  &:hover {
    background-color: ${(props) => props.theme.borderColor};
    opacity: .6;
  }
`;

const ItemText = styled.span`
  color: ${(props) => props.theme.textColor};
`;
