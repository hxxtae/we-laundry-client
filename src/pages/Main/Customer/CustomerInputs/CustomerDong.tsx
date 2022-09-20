import { AnimatePresence } from 'framer-motion';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles, KeyboardBox } from '../../../../components';
import { colors, includes, inputStyle } from '../../../../styles';
import { inputMessage, regexrObj } from '../../../../util';

interface ICustomerDong {
  searchActive: boolean;
}

function CustomerDong({ searchActive }: ICustomerDong, ref: any) {
  console.log('CustomerDong');
  const [selectAct, setSelectAct] = useState(false);
  const { register, formState: { errors }, setValue, getValues } = useFormContext();
  
  useImperativeHandle(ref, () => ({
    selectClose: () => {
      setSelectAct(false);
    },
  }), []);

  return (
    <InputBox>
      <InputTitles title='동' des='주소의 동 수를 입력해주세요.' />
      <InputWrapper>
        <Input
          readOnly
          onClick={() => setSelectAct((prev) => !prev)}
          err={errors.dong?.message}
          autoComplete="off"
          placeholder="동입력"
          {...register('dong', {
            required: !searchActive ? inputMessage.required : false,
            maxLength: { value: 5, message: inputMessage.maxLen(5) },
            minLength: { value: 1, message: inputMessage.minLen(1) },
            pattern: { value: regexrObj.notSpaceAndSpecial, message: "숫자만 입력가능합니다." },
        })}/>
        <ErrorMessage absolute={true} message={errors.dong?.message} />
        <AnimatePresence>
          {selectAct && <KeyboardBox name={'dong'} setValue={setValue} value={getValues('dong')}/>}
        </AnimatePresence>
      </InputWrapper>
    </InputBox>
  )
}

export default forwardRef(CustomerDong);

const InputBox = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 160px;
  margin-right: 10px;
  z-index: 10;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{ err?: string }>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
`;
