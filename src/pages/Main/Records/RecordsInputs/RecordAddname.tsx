import { AnimatePresence, motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';

import { colors, dragging, includes, inputStyle, media, scroll } from '../../../../styles';
import { ErrorMessage, InputTitles, LoadingItem } from '../../../../components';
import { IAddressResponse } from '../../../../services/address';
import { useAddressFetch } from '../../../../hooks';
import { inputMessage } from '../../../../util';

function RecordAddname() {

  const [selectAct, setSelectAct] = useState(false);
  const [selectChk, setSelectChk] = useState('');
  const { register, formState: { errors }, setValue } = useFormContext();
  const { loading, addDatas } = useAddressFetch();

  const selectClick = (addid: string, addname: string, addfullname: string) => {
    setValue('addname', addname);
    setSelectAct(false);
    setSelectChk(addid);
  }

  return (
    <InputBox>
      <InputTitles title='고객 선택' des='' />
      <InputWrapper>
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
              {loading ? <LoadingItem /> :
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
      </InputWrapper>
    </InputBox>
  )
}

export default RecordAddname;

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

const InputBox = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 120px;
  z-index: 10;

  @media ${media.pc_s} {
    width: 200px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
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

