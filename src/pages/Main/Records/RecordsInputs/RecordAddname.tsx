import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { buttonStyle, colors, includes, inputStyle, media } from '../../../../styles';
import { AddnameSelectList, InputTitles } from '../../../../components';
import { recordReceiptExeState } from '../../../../global';
import { inputMessage, queryKeys } from '../../../../util';

function RecordAddname() {
  const [selectAct, setSelectAct] = useState(false);
  const receiptExeChk = useRecoilValue(recordReceiptExeState); // 접수 완료 확인 state
  const { register, formState: { errors }, setValue } = useFormContext();
  const client = useQueryClient();

  const onSelectClick = (addid: string, addname: string, addfullname: string) => {
    setValue('addname', addname);
    setSelectAct(false);
  }

  const onRefetch = () => {
    client.invalidateQueries(queryKeys.address.all);
  }

  useEffect(() => {
    setSelectAct(false);
  }, [receiptExeChk]);

  return (
    <InputBox>
      <InputTitles title='고객 선택'/>
      <Wrapper>
        <InputWrapper>
          <Input
            err={errors.addname?.message}
            autoComplete="off"
            placeholder="주소이름선택"
            onClick={() => setSelectAct((prev) => !prev)}
            readOnly
            {...register('addname', {
            required: inputMessage.required,
            })} />
          <AddnameSelectList selectAct={selectAct} onSelectClick={onSelectClick} />
        </InputWrapper>
        <ReFetch type='button' onClick={onRefetch}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </ReFetch>
      </Wrapper>
    </InputBox>
  )
}

export default RecordAddname;

const InputBox = styled.div`
  margin-right: 10px;
  width: 200px;
  z-index: 10;

  @media ${media.pc_l} {
    width: auto;
    flex-grow: 1;
  }
`;

const Wrapper = styled.div`
  ${includes.flexBox()}
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{ err?: string }>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  z-index: 11;
`;

const ReFetch = styled.button`
  ${buttonStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  min-width: 40px;
  min-height: 40px;
  color: ${(props) => props.theme.textColor};

  &:active {
    opacity: .6;
  }
`;
