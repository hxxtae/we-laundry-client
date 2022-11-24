import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../components';
import { colors, inputStyle } from '../../../styles';
import { inputMessage } from '../../../util';

function SignupPasswordConfirm() {
  const { register, formState: { errors }, getValues } = useFormContext();

  const pwdValidate = (value: string) =>
    value === getValues('password') || '비밀번호가 일치하지 않습니다.'
  
  const inputProp = register('passwordRepeat',
    {
      required: inputMessage.required,
      validate: pwdValidate,
    });

  return (
    <InputBox>
      <InputTitles title='비밀번호 확인' />
      <Input
        type='password'
        err={errors.passwordRepeat?.message}
        {...inputProp}
      />
      <ErrorMessage absolute={true} message={errors.passwordRepeat?.message} />
    </InputBox>
  )
}

export default SignupPasswordConfirm;

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