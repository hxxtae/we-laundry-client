import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { customerApi } from '../../../global';
import { ICustomerSearchRequest } from '../../../services/customer';
import { buttonStyle, includes } from '../../../styles';
import { CustomerAddname, CustomerDong, CustomerHo } from '../Customer/CustomerInputs';

function RecordsForm() {

  const customerService = useRecoilValue(customerApi);
  const method = useForm<ICustomerSearchRequest>();
  const client = useQueryClient();

  const { isLoading, mutate } = useMutation(({addname, dong, ho}: ICustomerSearchRequest) => customerService.searchFetchCus({addname, dong, ho}))

  const onSubmit = ({addname, dong, ho}: ICustomerSearchRequest) => {
    
  }

  const onRefetch = () => {
    client.invalidateQueries(["/address", "fetch"]);
  }

  return (
    <FormProvider {...method} >
      <InputGroup onSubmit={method.handleSubmit(onSubmit)}>
        <CustomerAddname />
        <ReFetch type='button' onClick={onRefetch}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </ReFetch>
        <CustomerDong searchActive={false} />
        <CustomerHo searchActive={false} />
        <ButtonBox>
          <SubmitButton>{'확인'}</SubmitButton>
        </ButtonBox>
      </InputGroup>
    </FormProvider>
  )
}

export default RecordsForm;

const InputGroup = styled.form`
  ${includes.flexBox('flex-end', 'flex-start')}
  //width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
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

const ResetButton = styled.button`
  ${buttonStyle.secondary}
  width: 80px;
  height: 100%;
  margin-right: 5px;
`;