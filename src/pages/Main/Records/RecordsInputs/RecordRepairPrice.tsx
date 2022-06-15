import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorMessage, InputTitles, KeyboardBox } from '../../../../components';
import { colors, includes, inputStyle } from '../../../../styles';
import { inputMessage, regexrObj } from '../../../../util';

function RecordRepairPrice() {
  const [selectAct, setSelectAct] = useState(false);
  const { register, formState: { errors }, setValue, getValues } = useFormContext();

  return (
    <InputBox>
      <InputTitles title='가격' des='수선 가격을 입력해주세요.' />
      <InputWrapper>
        <Input
          type="number"
          readOnly
          onClick={() => setSelectAct((prev) => !prev)}
          err={errors.price?.message}
          autoComplete="off"
          placeholder="수선가격"
          {...register('price', {
            required: inputMessage.required,
            maxLength: { value: 7, message: inputMessage.maxLen(7) },
            minLength: { value: 1, message: inputMessage.minLen(1) },
            pattern: { value: regexrObj.notFirstZero, message: '잘못된 형식입니다.'}
        })} />
        <ErrorMessage absolute={true} message={errors.price?.message} />

        <AnimatePresence>
          {selectAct && <KeyboardBox name={'price'} setValue={setValue} value={getValues('price')}/>}
        </AnimatePresence>
      </InputWrapper>
    </InputBox>
  )
}

export default RecordRepairPrice;

const InputBox = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 190px;
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
`;