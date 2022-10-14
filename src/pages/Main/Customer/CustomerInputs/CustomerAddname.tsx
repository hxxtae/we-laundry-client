import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { AddnameSelectList, ErrorMessage, InputTitles } from '../../../../components';
import { colors, includes, inputStyle } from '../../../../styles';
import { inputMessage } from '../../../../util';

function CustomerAddname() {
  const [selectAct, setSelectAct] = useState(false);
  const { register, formState: { errors }, setValue } = useFormContext();

  const onSelectClick = (addid: string, addname: string, addfullname: string) => {
    setValue('addid', addid);
    setValue('addname', addname);
    setValue('addfullname', addfullname);
    setSelectAct(false);
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

      <AddnameSelectList selectAct={selectAct} onSelectClick={onSelectClick} />
    </InputBox>
  )
}

export default CustomerAddname;

const InputBox = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 160px;
  flex-grow: 2;
  z-index: 10;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
  z-index: 11;
`;
