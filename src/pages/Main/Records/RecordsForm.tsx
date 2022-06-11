import { faArrowRotateRight, faBandage, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import styled from 'styled-components';
import { LoadingComponent, Overlay } from '../../../components';

import { useAvailableChk } from '../../../hooks/useAvailableChk';
import { useRecordCustomerFetch } from '../../../hooks/useRecordCustomerFetch';
import { IRecordSearchRequestByAdd } from '../../../services/records';
import { buttonStyle, colors, includes } from '../../../styles';
import { RecordAddname, RecordDong, RecordHo } from './RecordsInputs';

function RecordsForm() {

  const [cusRequest, setCusRequest] = useState<IRecordSearchRequestByAdd>({ addname: '', dong: '', ho: '' });
  const method = useForm<IRecordSearchRequestByAdd>();
  const client = useQueryClient();

  const { loading, cusDatas } = useRecordCustomerFetch(cusRequest);
  const availableChk = useAvailableChk({ cusDatas });

  const onSearch = ({ addname, dong, ho }: IRecordSearchRequestByAdd) => {
    const data = { addname, dong, ho };
    setCusRequest({
      ...data
    });
  }

  const onRefetch = () => {
    client.invalidateQueries(["/address", "fetch"]);
  }

  return (
    <>
      <FormProvider {...method} >
        <InputGroup onSubmit={method.handleSubmit(onSearch)}>
          <Available chk={availableChk}>
            <FontAwesomeIcon icon={faCircleCheck} />
            {availableChk ? '확인됨' : '확인안됨'}
          </Available>
          <RecordAddname />
          <ReFetch type='button' onClick={onRefetch}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </ReFetch>
          <RecordDong searchActive={false} />
          <RecordHo searchActive={false} />
          <ButtonBox>
            <SubmitButton>{'확인'}</SubmitButton>
          </ButtonBox>
        </InputGroup>
      </FormProvider>

      {loading &&
      <Overlay>
        <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
      </Overlay>}
    </>
  )
}

export default RecordsForm;

const InputGroup = styled.form`
  position: relative;
  ${includes.flexBox('flex-end', 'flex-start')}
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
`;

const Available = styled.div<{chk: boolean}>`
  position: absolute;
  top: 20px;
  left: 85px;
  ${includes.flexBox('center', 'space-between')}
  min-width: 50px;
  font-size: 10px;
  color: ${(props) => props.chk ? colors.green : colors.red};
  
`;

const ReFetch = styled.button`
  ${buttonStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  margin-right: 10px;
  min-width: 40px;
  min-height: 40px;
  color: ${(props) => props.theme.textColor};
  &:active {
    opacity: .6;
  }
`;

const ButtonBox = styled.div`
  ${includes.flexBox()}
  height: 40px;
`;

const SubmitButton = styled.button`
  ${buttonStyle.primary()}
  width: 80px;
  height: 100%;
`;
