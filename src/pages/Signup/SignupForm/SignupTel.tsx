import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../components';
import { colors, inputStyle } from '../../../styles';
import { inputMessage, regexrObj } from '../../../util';

function SignupTel() {
  const { register, formState: { errors } } = useFormContext();
  const inputProp = register('tel',
    {
      required: inputMessage.required,
      pattern: { value: regexrObj.signup.tel, message: '잘못된 입력 입니다.' }
    });

  return (
    <InputBox>
      <InputTitles
        title='전화번호'
        des='서비스 사용을 위해 전화번호 인증이 필요합니다.' />
      <Input
        err={errors.tel?.message}
        autoComplete='off'
        {...inputProp}
      />
      <ErrorMessage absolute={true} message={errors.tel?.message} />
    </InputBox>
  )
}

export default SignupTel;

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
