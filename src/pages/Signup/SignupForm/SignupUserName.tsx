import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../components';
import { colors, inputStyle } from '../../../styles';
import { inputMessage, regexrObj } from '../../../util';

function SignupUserName() {
  const { register, formState: { errors } } = useFormContext();
  const inputProp = register('username',
    {
      required: inputMessage.required,
      minLength: { value: 2, message: inputMessage.minLen(2) },
      maxLength: { value: 10, message: inputMessage.maxLen(10) },
      pattern: {
        value: regexrObj.signup.username, message: '영문, 영문 + 숫자 조합이여야 합니다.'
      }
    });

  return (
    <InputBox>
      <InputTitles
        title='닉네임'
        des='다른 유저와 겹치지 않는 영문 별명을 입력해주세요. (2~10자)' />
      <Input
        err={errors.username?.message}
        autoComplete='off'
        {...inputProp}
      />
      <ErrorMessage absolute={true} message={errors.username?.message} />
    </InputBox>
  )
}

export default SignupUserName;

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
