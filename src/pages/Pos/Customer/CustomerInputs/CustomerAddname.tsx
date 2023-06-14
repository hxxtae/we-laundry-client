import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';

import { AddnameSelectList, ErrorMessage, InputTitles } from '../../../../components';
import { buttonStyle, colors, includes, inputStyle } from '../../../../styles';
import { inputMessage, queryKeys } from '../../../../util';
import { customerRequestState } from '../application/atom';

interface ICustomerAddname {
  searchActive: boolean;
}

function CustomerAddname({ searchActive }: ICustomerAddname, ref?: any) {
  const [selectAct, setSelectAct] = useState(false);
  const setCustomerObj = useSetRecoilState(customerRequestState);
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const client = useQueryClient();

  const inputProp = register('addname', {
    required: !searchActive || watch('dong') || watch('ho') ? inputMessage.required : false,
  });

  const onSelectClick = (addid: string, addname: string, addfullname: string) => {
    setCustomerObj((prev) => ({
      ...prev,
      addid,
      addname,
      addfullname,
    }));
    setValue('addname', addname);
    setSelectAct(false);
  }

  const onRefetch = () => {
    client.invalidateQueries(queryKeys.address.all);
  }

  useImperativeHandle(ref, () => ({
    selectClose: () => {
      setSelectAct(false);
    },
  }), []);

  return (
    <InputBox>
      <InputTitles title='주소이름' des='주소의 이름을 선택해주세요.' />
      <Wrapper>
        <InputWrapper>
          <Input
            err={errors.addname?.message}
            autoComplete="off"
            placeholder="주소이름선택"
            onClick={() => setSelectAct((prev) => !prev)}
            readOnly
            {...inputProp} />
          <ErrorMessage absolute={true} message={errors.addname?.message} />
          <AddnameSelectList selectAct={selectAct} onSelectClick={onSelectClick} />
        </InputWrapper>
        <ReFetch type='button' onClick={onRefetch}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </ReFetch>
      </Wrapper>
    </InputBox>
  )
}

export default forwardRef(CustomerAddname);

const InputBox = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`;

const Wrapper = styled.div`
  ${includes.flexBox()}
`;

const InputWrapper = styled.div`
  position: relative;
  flex-grow: 2;
  z-index: 10;
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base()}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  z-index: 11;
`;

const ReFetch = styled.button`
  display: inline-block;
  ${buttonStyle.base()}
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
