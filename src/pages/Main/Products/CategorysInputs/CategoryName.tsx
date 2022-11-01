import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { colors, includes, inputStyle } from '../../../../styles';
import { ErrorMessage, InputTitles } from '../../../../components';
import { inputMessage, regexrObj } from '../../../../util';

function CategoryName() {
  const { register, formState: { errors } } = useFormContext();

  const inputProp = register("categoryName", {
    required: inputMessage.required,
    maxLength: { value: 8, message: inputMessage.maxLen(8) },
    minLength: { value: 1, message: inputMessage.minLen(1) },
    pattern: { value: regexrObj.notPartSpecial, message: "_ / , 외 특수문자 입력 불가합니다." },
    setValueAs: value => value.trim(),
  });

  return (
    <InputBox>
      <InputTitles title='카테고리명' des='카테고리 이름을 입력해주세요.' />
      <Input
        err={errors.categoryName?.message}
        autoComplete="off"
        placeholder="카테고리명입력"
        {...inputProp} />
      <ErrorMessage absolute={true} message={errors.categoryName?.message} />
    </InputBox>
  )
}

export default CategoryName;

const InputBox = styled.div`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  margin-top: 60px;
`;

const Input = styled.input<{err: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
`;
