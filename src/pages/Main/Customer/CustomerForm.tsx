import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { customerApi, customerRequestState, updateState } from '../../../global';
import { CustomerAddname, CustomerDong, CustomerHo } from './CustomerInputs';
import { buttonStyle, includes, toastStyle } from '../../../styles';
import { LoadingComponent, Overlay } from '../../../components';
import { ICustomerRequest } from '../../../services/customer';
import { queryKeys } from '../../../util';

function CustomerForm() {
  const customerService = useRecoilValue(customerApi);
  const updateData = useRecoilValue(customerRequestState)
  const [updateActive, setUpdateActive] = useRecoilState(updateState);
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
    method.setValue('id', updateData.id);
    method.setValue('addid', updateData.addid);
    method.setValue('addname', updateData.addname);
    method.setValue('addfullname', updateData.addfullname);
    method.setValue('name', updateData.name);
    method.setValue('dong', updateData.dong);
    method.setValue('ho', updateData.ho);
  }, [updateData]);

  const onSubmit = ({ id, addid, addname, addfullname, name, dong, ho }: ICustomerRequest) => {
    const requestData = { id, addid, addname, addfullname, name, dong, ho };
    mutate(requestData, {
      onSuccess: () => {
        method.reset();
        updateActive ? toastStyle.info('변경되었습니다.') : toastStyle.success('추가되었습니다.');
        setUpdateActive(false);
        client.invalidateQueries(queryKeys.customer.list());
        client.invalidateQueries(queryKeys.records.list());
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
    client.invalidateQueries(queryKeys.address.all);
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
  margin-bottom: 0; // (tablet style) 이 미세하게 틀어짐 막음
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
