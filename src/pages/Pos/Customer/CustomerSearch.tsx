import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { buttonStyle, includes } from '../../../styles';

import { CustomerDTO } from './application/interface';
import { customerSearchState, searchState } from './application/atom';
import { CustomerAddname, CustomerDong, CustomerHo } from './CustomerInputs';

interface ICustomerSearch {
  onPageReset: () => void;
}

function CustomerSearch({ onPageReset }: ICustomerSearch) {
  const setData = useSetRecoilState(customerSearchState);
  const setSearchPop = useSetRecoilState(searchState);
  const method = useForm<CustomerDTO.ICustomerSearchRequest>();

  const onSearch = ({addname, dong, ho}: CustomerDTO.ICustomerSearchRequest) => {
    setData({ addname, dong, ho });
    setSearchPop(false);
    onPageReset();
  }

  return (
    <SearchBox>
      <Close type='button' onClick={() => setSearchPop(false)}>
        <FontAwesomeIcon icon={faXmark} />
      </Close>
      <FormProvider {...method} >
        <InputGroup onSubmit={method.handleSubmit(onSearch)}>
          <CustomerAddname searchActive={true} />
          <CustomerDong searchActive={true} />
          <CustomerHo searchActive={true} />
          <SubmitButton>{'조회'}</SubmitButton>
        </InputGroup>
      </FormProvider>
    </SearchBox>
  )
}

export default CustomerSearch;

const SearchBox = styled.div`
${includes.flexBox('flex-start', 'center')}
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 20;
`;

const Close = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  ${includes.flexBox()}
  ${buttonStyle.base()}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    opacity: .6;
  }
`;

const InputGroup = styled.form`
  ${includes.flexBox('flex-end', 'center')}
  width: 100%;
  padding: 20px;
  margin-top: 70px;
`;

const SubmitButton = styled.button`
  ${buttonStyle.primary()}
  width: 80px;
  height: 40px;
`;
