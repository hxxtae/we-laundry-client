import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../components';
import { colors, inputStyle } from '../../../styles';
import { inputMessage, regexrObj } from '../../../util';

function SignupPassword() {
  const { register, formState: { errors } } = useFormContext();
  const inputProp = register('password',
    {
      required: inputMessage.required,
      maxLength: { value: 18, message: inputMessage.maxLen(18) },
      minLength: { value: 6, message: inputMessage.minLen(6) },
      pattern: {
        value: regexrObj.signup.password, message: '영문 + 숫자를 포함하여야 합니다.'
      }
    });

  return (
    <InputBox>
      <InputTitles
        title='비밀번호'
        des='영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.' />
      <Input
        type='password'
        err={errors.password?.message}
        {...inputProp}
      />
      <ErrorMessage absolute={true} message={errors.password?.message} />
    </InputBox>
  )
}

export default SignupPassword;

const InputBox = styled.div`
  margin-bottom: 25px;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};

  &:focus {
    border-color: ${(props) => props.err ? `${colors.red}` : '' };
  }
`;