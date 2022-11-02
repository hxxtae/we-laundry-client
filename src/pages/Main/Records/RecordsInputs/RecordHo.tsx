import { AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { colors, inputStyle, media } from '../../../../styles';
import { inputMessage, regexrObj } from '../../../../util';
import { recordReceiptExeState } from '../../../../global';
import { KeyboardBox } from '../../../../components';

interface IRecordHo {
  searchActive: boolean;
}

function RecordHo({ searchActive }: IRecordHo, ref: any) {
  const [selectAct, setSelectAct] = useState(false);
  const receiptExeChk = useRecoilValue(recordReceiptExeState); // 접수 완료 확인 state
  const { register, formState: { errors }, setValue, getValues } = useFormContext();

  const inputProp = register('ho', {
    required: !searchActive ? inputMessage.required : false,
    maxLength: { value: 5, message: inputMessage.maxLen(5) },
    minLength: { value: 1, message: inputMessage.minLen(1) },
    pattern: { value: regexrObj.notSpaceAndSpecial, message: "숫자만 입력가능합니다." },
  });

  useImperativeHandle(ref, () => ({
    selectClose: () => {
      setSelectAct(false);
    },
  }), []);

  useEffect(() => {
    setSelectAct(false);
  }, [receiptExeChk]);

  return (
    <InputBox>
      <Input
        readOnly
        onClick={() => setSelectAct((prev) => !prev)}
        err={errors.ho?.message}
        autoComplete="off"
        placeholder="호입력"
        {...inputProp}/>

      <AnimatePresence>
        {selectAct && <KeyboardBox name={'ho'} setValue={setValue} value={getValues('ho')}/>}
      </AnimatePresence>
    </InputBox>
  )
}

export default forwardRef(RecordHo);

const InputBox = styled.div`
  position: relative;
  width: 130px; 
  margin-right: 10px;
  z-index: 10;

  @media ${media.pc_s} {
    width: 150px;
  }
`;

const Input = styled.input<{ err?: string }>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
