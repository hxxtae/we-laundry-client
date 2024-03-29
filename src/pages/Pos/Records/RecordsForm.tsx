import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useRecordCustomerFetch, useAvailableChk } from '../../../hooks';
import { buttonStyle, colors, includes, media } from '../../../styles';
import { IRecordSearchRequestByAdd } from '../../../services/records';
import { RecordAddname, RecordDong, RecordHo } from './RecordsInputs';
import { LoadingComponent, Overlay } from '../../../components';
import { recordReceiptExeState } from '../../../global';

function RecordsForm() {
  const [cusRequest, setCusRequest] = useState<IRecordSearchRequestByAdd>({ addname: '', dong: '', ho: '' });
  const receiptExeChk = useRecoilValue(recordReceiptExeState); // 접수 완료 확인 state
  const method = useForm<IRecordSearchRequestByAdd>();
  const { loading, cusDatas } = useRecordCustomerFetch(cusRequest);
  const availableChk = useAvailableChk({ cusDatas });
  // NOTE: input of 'dong' and 'ho' reference object.
  const childDongRef = useRef<{ selectClose: () => void }>();
  const childHoRef = useRef<{ selectClose: () => void }>();

  const onSearch = ({ addname, dong, ho }: IRecordSearchRequestByAdd) => {
    const data = { addname, dong, ho };
    setCusRequest({
      ...data
    });
  }

  useEffect(() => {
    method.reset();
  }, [receiptExeChk]);

  useEffect(() => {
    if (availableChk) {
      childDongRef.current?.selectClose();
      childHoRef.current?.selectClose();
    }
  }, [availableChk]);

  return (
    <>
      <FormProvider {...method} >
        <InputGroup onSubmit={method.handleSubmit(onSearch)}>
          <Available chk={availableChk}>
            <FontAwesomeIcon icon={faCircleCheck} />
            <Text>{availableChk ? '확인됨' : '확인안됨'}</Text>
          </Available>
          <RecordAddname />
          <RecordDong ref={childDongRef} searchActive={false} />
          <RecordHo ref={childHoRef} searchActive={false} />
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
  left: 78px;
  ${includes.flexBox('center', 'space-between')}
  font-size: 10px;
  color: ${(props) => props.chk ? colors.lightGreen : colors.red};

  @media ${media.pc_s} {
    top: 20px;
    left: 85px;
  }
`;

const Text = styled.span`
  margin-left: 3px;
  line-height: 1px;
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
