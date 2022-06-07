import { AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';

import { ErrorMessage, InputTitles, KeyboardBox } from '../../../../components';
import { appearance, colors, includes, inputStyle } from '../../../../styles';
import { inputMessage, regexrObj } from '../../../../util';

function ProductPrice() {
  const [selectAct, setSelectAct] = useState(false);
  const { register, formState: { errors }, setValue, getValues } = useFormContext();

  return (
    <InputBox>
      <InputTitles title='가격' des='품목의 가격을 입력해주세요.' />
      <Input
        type="number"
        readOnly
        onClick={() => setSelectAct((prev) => !prev)}
        err={errors.price?.message}
        autoComplete="off"
        placeholder="가격입력"
        {...register("price", {
          required: inputMessage.required,
          maxLength: { value: 7, message: inputMessage.maxLen(7) },
          minLength: { value: 1, message: inputMessage.minLen(1) },
          pattern: { value: regexrObj.notFirstZero, message: '잘못된 형식입니다.'}
        })} />
      <ErrorMessage absolute={true} message={errors.price?.message} />

      <AnimatePresence>
        {selectAct && <KeyboardBox name={'price'} setValue={setValue} value={getValues('price')} />}
      </AnimatePresence>
    </InputBox>
  )
}

export default ProductPrice;

const InputBox = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  margin-top: 50px;
`;

const Input = styled.input<{ err: string }>`
  ${inputStyle.base}
  ${appearance.none}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
`;
