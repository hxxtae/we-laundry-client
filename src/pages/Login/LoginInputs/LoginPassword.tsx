import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../components';
import { colors, inputStyle } from '../../../styles';
import { inputMessage } from '../../../util';

function LoginPassword() {
  const { register, formState: { errors } } = useFormContext();

  const inputProp = register('password', {
    required: inputMessage.required,
    minLength: { value: 6, message: inputMessage.minLen(6) },
    maxLength: { value: 18, message: inputMessage.maxLen(18) }
  });

  return (
    <Wrapper>
      <InputTitles des='사용자 비밀번호 입력' response={true}/>
      <Input
        err={errors.password?.message}
        type="password"
        {...inputProp}
        placeholder="비밀번호"
        autoComplete='off' />
      <ErrorMessage message={errors.password?.message} />
    </Wrapper>
  )
}

export default LoginPassword;

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

