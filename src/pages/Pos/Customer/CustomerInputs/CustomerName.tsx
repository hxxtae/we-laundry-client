import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorMessage, InputTitles } from '../../../../components';
import { colors, includes, inputStyle } from '../../../../styles';
import { inputMessage, regexrObj } from '../../../../util';

function CustomerName() {
  const { register, formState: { errors } } = useFormContext();

  const inputProp = register('name', {
    required: inputMessage.required,
    maxLength: { value: 10, message: inputMessage.maxLen(10) },
    minLength: { value: 2, message: inputMessage.minLen(1) },
    pattern: { value: regexrObj.notSpaceAndSpecial, message: "공백과 특수문자 사용은 불가합니다." },
  });

  return (
    <InputBox>
      <InputTitles title='고객이름' des='신규 고객의 이름을 입력해주세요.' />
      <Input
        err={errors.name?.message}
        autoComplete="off"
        placeholder="고객이름입력"
        {...inputProp} />
      <ErrorMessage absolute={true} message={errors.name?.message} />
    </InputBox>
  )
}

export default CustomerName;

const InputBox = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  min-width: 200px;
  margin-right: 10px;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
`;