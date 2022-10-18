import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styled from 'styled-components';

import { IRecordSearchRequestByAdd, IRecordSearchRequestByDongAndHo } from '../../../../services/records';
import { RecordAddname, RecordDong, RecordHo } from '../../Records/RecordsInputs';
import { buttonStyle, includes } from '../../../../styles';

interface IHistoryCustomerSearch {
  setCustomerActive: React.Dispatch<React.SetStateAction<boolean>>;
  setNowDate: React.Dispatch<React.SetStateAction<string>>;
  setCusObj: React.Dispatch<React.SetStateAction<{ addname: string, dong: string, ho: string }>>;
  prevInput: IRecordSearchRequestByDongAndHo;
}

function HistoryCustomerSearch({ setCustomerActive, setNowDate, setCusObj, prevInput }: IHistoryCustomerSearch) {
  const method = useForm<IRecordSearchRequestByAdd>();

  const onSearch = ({ addname, dong, ho }: IRecordSearchRequestByAdd) => {
    const data = { addname, dong, ho };
    setCusObj(data);
    setNowDate('');
    setCustomerActive(false);
  }

  useEffect(() => {
    method.setValue('addname', prevInput.addname);
    method.setValue('dong', prevInput.dong);
    method.setValue('ho', prevInput.ho || '');
  }, []);

  return (
    <FormProvider {...method} >
      <InputGroup onSubmit={method.handleSubmit(onSearch)}>
        <RecordAddname />
        <RecordDong searchActive={false} />
        <RecordHo searchActive={true} />
        <ButtonBox>
          <Submit>{'확인'}</Submit>
        </ButtonBox>
        <Close type='button' onClick={() => setCustomerActive(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </Close>
      </InputGroup>
    </FormProvider>
  )
}

export default HistoryCustomerSearch;

const InputGroup = styled.form`
  position: relative;
  top: -100px;
  ${includes.flexBox('flex-end', 'flex-start')}
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 25px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
`;

const ButtonBox = styled.div`
  ${includes.flexBox()}
  height: 40px;
`;

const Submit = styled.button`
  ${buttonStyle.primary()}
  width: 80px;
  height: 100%;
`;

const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  ${includes.flexBox()}
  ${buttonStyle.base}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};

  &:hover,
  &:active {
    opacity: .6;
  }
`;