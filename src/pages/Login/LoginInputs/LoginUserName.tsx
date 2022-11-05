import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../components';
import { colors, inputStyle } from '../../../styles';
import { inputMessage } from '../../../util';

function LoginUserName() {
  const { register, formState: { errors } } = useFormContext();

  const inputProp = register('username', {
    required: inputMessage.required,
    minLength: { value: 2, message: inputMessage.minLen(2) },
    maxLength: { value: 10, message: inputMessage.maxLen(10) }
  });

  return (
    <Wrapper>
      <InputTitles des='사용자 아이디 입력' response={true}/>
      <Input
        err={errors.username?.message}
        {...inputProp}
        placeholder="닉네임"
        autoComplete='off' />
      <ErrorMessage message={errors.username?.message} />
    </Wrapper>
  )
}

export default LoginUserName;

const Wrapper = styled.div`
  &:first-child{
    margin-bottom: 10px;
  }
`;

const Input = styled.input<{err: string | undefined}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}`};
  color: ${(props) => props.theme.textColor};
  margin-bottom: ${({ err }) => err ? '5px' : '0'};

  &:focus {
    border-color: ${(props) => props.err ? `${colors.red}` : ''};
  }
`;
