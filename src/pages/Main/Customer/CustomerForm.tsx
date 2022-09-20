import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { useCustomerMutate } from './application/hooks';
import { customerRequestState } from '../../../global';
import { CustomerAddname, CustomerDong, CustomerHo } from './CustomerInputs';
import { buttonStyle, includes } from '../../../styles';
import { LoadingComponent, Overlay } from '../../../components';
import { ICustomerRequest } from '../../../services/customer';
import { queryKeys } from '../../../util';

function CustomerForm() {
  const updateData = useRecoilValue(customerRequestState);
  const resetUpdateData = useResetRecoilState(customerRequestState);
  const { isLoading, mutate, client, state: { updateActive, setUpdateActive }} = useCustomerMutate();
  const method = useForm<ICustomerRequest>();
  // NOTE: input of 'dong' and 'ho' reference object.
  const childDongRef = useRef<{ selectClose: () => void }>();
  const childHoRef = useRef<{ selectClose: () => void }>();

  const onSubmit = ({ id, addid, addname, addfullname, name, dong, ho }: ICustomerRequest) => {
    const data = { id, addid, addname, addfullname, name, dong, ho };
    mutate(data, {
      onSuccess: () => {
        method.reset();
      },
    });
    // NOTE: input of 'dong' and 'ho' keyboardBox close function.
    childDongRef.current?.selectClose();
    childHoRef.current?.selectClose();
  };

  const onUpdateCancel = () => {
    method.reset();
    resetUpdateData();
    setUpdateActive(false);    
  };

  const onRefetch = () => {
    client.invalidateQueries(queryKeys.address.all);
  }

  useEffect(() => {
    if (!updateActive) return;
    method.reset();
    method.setValue('id', updateData.id);
    method.setValue('addid', updateData.addid);
    method.setValue('addname', updateData.addname);
    method.setValue('addfullname', updateData.addfullname);
    method.setValue('name', updateData.name);
    method.setValue('dong', updateData.dong);
    method.setValue('ho', updateData.ho);
  }, [updateData]);

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
          <CustomerDong ref={childDongRef} searchActive={false} />
          <CustomerHo ref={childHoRef} searchActive={false} />
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
