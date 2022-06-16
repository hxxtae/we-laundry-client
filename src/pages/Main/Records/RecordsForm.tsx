import { faArrowRotateRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { useRecordCustomerFetch, useAvailableChk } from '../../../hooks';
import { buttonStyle, colors, includes, media } from '../../../styles';
import { IRecordSearchRequestByAdd } from '../../../services/records';
import { RecordAddname, RecordDong, RecordHo } from './RecordsInputs';
import { LoadingComponent, Overlay } from '../../../components';

function RecordsForm() {
  console.log('RecordForm');

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
            <Text>{availableChk ? '확인됨' : '확인안됨'}</Text>
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
  padding: 15px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;

  @media ${media.pc_s} {
    padding: 20px;
  }
`;

const Available = styled.div<{chk: boolean}>`
  position: absolute;
  top: 15px;
  left: 85px;
  ${includes.flexBox('center', 'space-between')}
  font-size: 10px;
  color: ${(props) => props.chk ? colors.green : colors.red};

  @media ${media.pc_s} {
    top: 20px;
  }
`;

const Text = styled.span`
  margin-left: 3px;
  line-height: 1px;
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
