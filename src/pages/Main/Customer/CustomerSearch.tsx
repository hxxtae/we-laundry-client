import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { CustomerAddname, CustomerDong, CustomerHo } from './CustomerInputs';
import { customerSearchState, searchState } from '../../../global';
import { ICustomerRequest } from '../../../services/customer';
import { buttonStyle, includes } from '../../../styles';

function CustomerSearch() {
  const setData = useSetRecoilState(customerSearchState);
  const [searchPop, setSearchPop] = useRecoilState(searchState);
  const method = useForm<ICustomerRequest>();

  const onSearch = ({addname, dong, ho}: ICustomerRequest) => {
    setData({ addname, dong, ho });
    setSearchPop(false);
  }

  return (
    <SearchBox>
      <Close type='button' onClick={() => setSearchPop(false)}>
        <FontAwesomeIcon icon={faXmark} />
      </Close>
      <FormProvider {...method} >
        <InputGroup onSubmit={method.handleSubmit(onSearch)}>
          <CustomerAddname />
          <CustomerDong searchActive={searchPop} />
          <CustomerHo searchActive={searchPop} />
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
