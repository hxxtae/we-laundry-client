import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ErrorMessage, InputTitles } from '../../../../components';
import { colors, includes, inputStyle } from '../../../../styles';
import { inputMessage } from '../../../../util';

interface IAddressFullName {
  onFindAddress: () => void;
}

function AddressFullName({ onFindAddress }: IAddressFullName) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <InputBox>
      <InputTitles title='주소' des='상세 주소를 입력해주세요.' />
      <Input
        err={errors.addfullname?.message}
        autoComplete="off"
        readOnly
        onClick={onFindAddress}
        onFocus={onFindAddress}
        {...register('addfullname', {
        required: inputMessage.required,
        maxLength: { value: 50, message: inputMessage.maxLen(50) },
      })} />
      <ErrorMessage absolute={true} message={errors.addfullname?.message} />
    </InputBox>
  )
}

export default AddressFullName;

const InputBox = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  margin-right: 10px;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
`;
