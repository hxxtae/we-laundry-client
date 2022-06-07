import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../../components';
import { LoadingItem } from '../../../../components';
import { useAddressFetch } from '../../../../hooks';
import { IAddressResponse } from '../../../../services/address';
import { colors, dragging, includes, inputStyle, scroll } from '../../../../styles';
import { inputMessage } from '../../../../util';

function CustomerAddname() {
  const [selectAct, setSelectAct] = useState(false);
  const [selectChk, setSelectChk] = useState('');
  const { register, formState: { errors }, setValue } = useFormContext();
  const { loading, addDatas } = useAddressFetch();

  const selectClick = (addid: string, addname: string, addfullname: string) => {
    setValue('addid', addid);
    setValue('addname', addname);
    setValue('addfullname', addfullname);
    setSelectAct(false);
    setSelectChk(addid);
  }

  return (
    <InputBox>
      <InputTitles title='주소이름' des='주소의 이름을 선택해주세요.' />
      <Input
        err={errors.addname?.message}
        autoComplete="off"
        placeholder="주소이름선택"
        onClick={() => setSelectAct((prev) => !prev)}
        readOnly
        {...register('addname', {
        required: inputMessage.required,
      })} />
      <ErrorMessage absolute={true} message={errors.addname?.message} />
      
      <AnimatePresence>
        {selectAct &&
          <SelectBox variants={selectVariant} initial="init" animate="start" exit="end">
            {loading ?
                <LoadingItem /> :
                addDatas?.map((item: IAddressResponse) => (
              <SelectItem
                key={item.id}
                chk={item.id === selectChk ? 'true' : 'false'}
                onClick={() => selectClick(item.id, item.addname, item.addfullname)}>
                <ItemText>
                  {item.addname}
                </ItemText>
              </SelectItem>
            ))}
          </SelectBox>}
      </AnimatePresence>
        
    </InputBox>
  )
}

export default CustomerAddname;

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
  }
}

const InputBox = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 160px;
  flex-grow: 1;
  z-index: 10;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
  z-index: 11;
`;

const SelectBox = styled(motion.ul)`
  position: absolute;
  top: 85px;
  left: 0;
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  width: 100%;
  max-height: 300px;
  background-color: ${(props) => props.theme.borderColor};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow-y: scroll;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
`;

const SelectItem = styled(motion.li)<{chk: string}>`
  ${dragging.stop}
  width: 100%;
  padding: 10px 16px;
  background-color: ${(props) => props.chk === 'true' ? props.theme.inputColor : 'transparent' };
  &:hover {
    background-color: ${(props) => props.theme.inputColor};
    opacity: .6;
  }
`;

const ItemText = styled.span`
  color: ${(props) => props.theme.textColor};
`;

