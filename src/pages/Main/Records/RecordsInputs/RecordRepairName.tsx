import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorMessage, InputTitles } from '../../../../components';
import { colors, includes, inputStyle, media } from '../../../../styles';
import { inputMessage, regexrObj } from '../../../../util';

function RecordRepairName() {
  const { register, formState: { errors }, setValue } = useFormContext();

  return (
    <InputBox>
      <InputTitles title='품명' des='수선 이름을 입력해주세요.' />
        <Input
          err={errors.repairName?.message}
          autoComplete="off"
          placeholder="수선이름"
          {...register('repairName', {
            required: inputMessage.required,
            maxLength: { value: 10, message: inputMessage.maxLen(10) },
            minLength: { value: 1, message: inputMessage.minLen(1) },
            pattern: { value: regexrObj.notPartSpecial, message: "_ / , 제외 특수문자 입력 불가합니다." },
            setValueAs: value => value.trim(),
        })} />
        <ErrorMessage absolute={true} message={errors.repairName?.message} />
    </InputBox>
  )
}

export default RecordRepairName;

const InputBox = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 190px;
  flex-grow: 1;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
`;
