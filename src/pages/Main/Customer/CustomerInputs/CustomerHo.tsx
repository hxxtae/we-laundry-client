import { AnimatePresence } from 'framer-motion';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles, KeyboardBox } from '../../../../components';
import { colors, includes, inputStyle } from '../../../../styles';
import { inputMessage, regexrObj } from '../../../../util';

interface ICustomerHo {
  searchActive: boolean;
}

function CustomerHo({ searchActive }: ICustomerHo, ref: any) {
  const [selectAct, setSelectAct] = useState(false);
  const { register, formState: { errors }, setValue, getValues } = useFormContext();

  useImperativeHandle(ref, () => ({
    selectClose: () => {
      setSelectAct(false);
    }
  }), []);

  return (
    <InputBox>
      <InputTitles title='호' des='주소의 호 수를 입력해주세요.' />
      <InputWrapper>
        <Input
          readOnly
          onClick={() => setSelectAct((prev) => !prev)}
          err={errors.ho?.message}
          autoComplete="off"
          placeholder="호입력"
          {...register('ho', {
            required: !searchActive ? inputMessage.required : false,
            maxLength: { value: 5, message: inputMessage.maxLen(5) },
            minLength: { value: 1, message: inputMessage.minLen(1) },
            pattern: { value: regexrObj.notSpaceAndSpecial, message: "숫자만 입력가능합니다." },
        })}/>
        <ErrorMessage absolute={true} message={errors.ho?.message} />

        <AnimatePresence>
          {selectAct && <KeyboardBox name={'ho'} setValue={setValue} value={getValues('ho')} />}
        </AnimatePresence>
      </InputWrapper>
    </InputBox>
  )
}

export default forwardRef(CustomerHo);

const InputBox = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 160px;
  margin-right: 10px;
  z-index: 10;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
