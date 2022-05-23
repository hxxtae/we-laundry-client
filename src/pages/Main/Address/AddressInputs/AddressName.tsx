import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../../components';
import { colors, includes, inputStyle } from '../../../../styles';
import { inputMessage, regexrObj } from '../../../../util';

function AddressName() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <InputBox>
      <InputTitles title='주소별명' des='주소의 별명을 입력해주세요.' />
      <Input
        err={errors.addname?.message}
        autoComplete="off"
        placeholder="주소별명입력"
        {...register('addname', {
        required: inputMessage.required,
        maxLength: { value: 10, message: inputMessage.maxLen(10) },
        minLength: { value: 2, message: inputMessage.minLen(2) },
        pattern: { value: regexrObj.address.addname, message: "공백과 특수문자 사용은 불가합니다." },
      })} />
      <ErrorMessage absolute={true} message={errors.addname?.message} />
    </InputBox>
  )
}

export default AddressName;

const InputBox = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  margin-right: 10px;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
`;
