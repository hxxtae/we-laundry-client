import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styled from 'styled-components';

import { IRecordSearchRequest, IRecordSearchRequestByAdd } from '../../../../services/records';
import { RecordAddname, RecordDong, RecordHo } from '../../Records/RecordsInputs';
import { buttonStyle, includes } from '../../../../styles';

interface IHistoryCustomerSearch {
  setCustomerActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchObj: React.Dispatch<React.SetStateAction<IRecordSearchRequest>>;
  searchObj: IRecordSearchRequest;
}

function HistoryCustomerSearch({ setCustomerActive, setSearchObj, searchObj }: IHistoryCustomerSearch) {
  const method = useForm<IRecordSearchRequestByAdd>();

  const onSearch = ({ addname, dong, ho }: IRecordSearchRequestByAdd) => {
    const data = { addname, dong, ho };
    setSearchObj(prev => ({
      ...prev,
      recordDate: '',
      ...data
    }));
    setCustomerActive(false);
  }

  useEffect(() => {
    method.setValue('addname', searchObj.addname);
    method.setValue('dong', searchObj.dong);
    method.setValue('ho', searchObj.ho || '');
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
  ${buttonStyle.base()}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};

  &:hover,
  &:active {
    opacity: .6;
  }
`;