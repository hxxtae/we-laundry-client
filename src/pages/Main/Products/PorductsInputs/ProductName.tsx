import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { colors, includes, inputStyle, media } from '../../../../styles';
import { ErrorMessage, InputTitles } from '../../../../components';
import { inputMessage, regexrObj } from '../../../../util';

function ProductName() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <InputBox>
      <InputTitles title='품목명' des='사용 할 품목명을 입력해주세요.' />
      <Input
        err={errors.productName?.message}
        autoComplete="off"
        placeholder="품목명입력"
        {...register("productName", {
          required: inputMessage.required,
          maxLength: { value: 10, message: inputMessage.maxLen(10) },
          minLength: { value: 1, message: inputMessage.minLen(1) },
          pattern: { value: regexrObj.includeKorAndEng, message: "한글 및 영문만 입력 가능" },
          setValueAs: value => value.trim(),
        })} />
      <ErrorMessage absolute={true} message={errors.productName?.message} />
    </InputBox>
  )
}

export default ProductName;

const InputBox = styled.div`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  margin-top: 30px;

  @media ${media.pc_s} {
    margin-top: 50px;
  }
`;

const Input = styled.input<{err: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
`;