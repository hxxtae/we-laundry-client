import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { buttonStyle, includes } from '../../../styles';
import { LoadingComponent, Overlay } from '../../../components';

import { CustomerDTO } from './application/interface';
import { customerRequestState, updateState } from './application/atom';
import { useCustomerIns, useCustomerResetAtom, useCustomerUpd } from './application/hooks';
import { CustomerAddname, CustomerDong, CustomerHo } from './CustomerInputs';

function CustomerForm() {
  const customerObj = useRecoilValue(customerRequestState);
  const [ updateActive, setUpdateActive ] = useRecoilState(updateState);
  const { resetCustomerRequest } = useCustomerResetAtom();
  const { isInsLoading, mutateIns } = useCustomerIns();
  const { isUpdLoading, mutateUpd } = useCustomerUpd();
  const method = useForm<CustomerDTO.ICustomerForm>();
  // NOTE: input of 'dong' and 'ho' reference object.
  const childAddnameRef = useRef<{ selectClose: () => void }>();
  const childDongRef = useRef<{ selectClose: () => void }>();
  const childHoRef = useRef<{ selectClose: () => void }>();

  const onSubmit = ({ addname, dong, ho }: CustomerDTO.ICustomerForm) => {
    const data = { ...customerObj, addname, dong, ho };
    if (!updateActive) {
      isInsLoading || mutateIns(data, {
        onSuccess: () => {
          method.reset();
          resetCustomerRequest();
        },
      });
    }
    if (updateActive && customerObj.id) {
      isUpdLoading || mutateUpd(data, {
        onSuccess: () => {
          method.reset();
          resetCustomerRequest();
        },
      });
    }
    onCloseKeyboardBox();
  };

  const onCloseKeyboardBox = () => {
    // NOTE: input of 'addname' & 'dong' & 'ho' keyboardBox close function.
    childAddnameRef.current?.selectClose();
    childDongRef.current?.selectClose();
    childHoRef.current?.selectClose();
  }

  const onUpdateCancel = () => {
    method.reset();
    resetCustomerRequest();
    setUpdateActive(false);
  };

  useEffect(() => {
    if (!updateActive) return;
    method.setValue('addname', customerObj.addname);
    method.setValue('dong', customerObj.dong);
    method.setValue('ho', customerObj.ho);
    onCloseKeyboardBox();
  }, [customerObj]);

  return (
    <>
      <FormProvider {...method} >
        <InputGroup onSubmit={method.handleSubmit(onSubmit)}>
          <CustomerAddname ref={childAddnameRef} searchActive={false} />
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

      {isInsLoading || isUpdLoading &&
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
