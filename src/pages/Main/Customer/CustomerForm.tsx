import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { CustomerAddname, CustomerDong, CustomerHo } from './CustomerInputs';
import { buttonStyle, includes, toastStyle } from '../../../styles';
import { LoadingComponent, Overlay } from '../../../components';
import { ICustomerRequest } from '../../../services/customer';
import { customerApi, customerRequestState } from '../../../global';

interface ICustomerInput {
  updateActive: boolean;
  setUpdateActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomerForm({ updateActive, setUpdateActive }: ICustomerInput) {
  console.log('CustomerForm');

  const customerService = useRecoilValue(customerApi);
  const data = useRecoilValue(customerRequestState);
  const client = useQueryClient();
  const method = useForm<ICustomerRequest>();

  const { isLoading, mutate } = useMutation(({ id, addid, addname, addfullname, name, dong, ho }: ICustomerRequest) =>
    !updateActive ?
      customerService.createCus({ addid, addname, addfullname, name, dong, ho }) : 
      customerService.updateCus({ id, addid, addname, addfullname, name, dong, ho }));
  
  useEffect(() => {
    if (!updateActive) {
      return;
    }
    method.reset();
    method.setValue('id', data.id);
    method.setValue('addid', data.addid);
    method.setValue('addname', data.addname);
    method.setValue('addfullname', data.addfullname);
    method.setValue('name', data.name);
    method.setValue('dong', data.dong);
    method.setValue('ho', data.ho);
  }, [data]);

  const onSubmit = ({ id, addid, addname, addfullname, name, dong, ho }: ICustomerRequest) => {
    const data = { id, addid, addname, addfullname, name, dong, ho };
    mutate(data, {
      onSuccess: () => {
        method.reset();
        updateActive ? toastStyle.info('변경되었습니다.') : toastStyle.success('추가되었습니다.');
        setUpdateActive(false);
        client.invalidateQueries(["/customer", "fetch"]);
      },
      onError: (error: any) => {
        toastStyle.error(error.message);
      }
    });
  };

  const onUpdateCancel = () => {
    method.reset();
    setUpdateActive(false);
  };

  const onRefetch = () => {
    client.invalidateQueries(["/address", "fetch"]);
  }

  return (
    <>
      <FormProvider {...method} >
        <InputGroup onSubmit={method.handleSubmit(onSubmit)}>
          <input style={{ display: "none" }} {...method.register('id')} />
          <input style={{ display: "none" }} {...method.register('addid')} />
          <input style={{ display: "none" }} {...method.register('addfullname')} />
          <CustomerAddname />
          <ReFetch type='button' onClick={onRefetch}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </ReFetch>
          <CustomerDong searchActive={false} />
          <CustomerHo searchActive={false} />
          <ButtonBox>
            {updateActive &&
              <ResetButton type='button' onClick={onUpdateCancel} >
                {'취소'}
              </ResetButton>}
            <SubmitButton>
              {updateActive ? '변경' : '추가'}
            </SubmitButton>
          </ButtonBox>
        </InputGroup>
      </FormProvider>

      {isLoading &&
      <Overlay>
        <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
      </Overlay>}
    </>
  )
}

export default CustomerForm;

const InputGroup = styled.form`
  ${includes.flexBox('flex-end', 'flex-start')}
  width: 100%;
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
