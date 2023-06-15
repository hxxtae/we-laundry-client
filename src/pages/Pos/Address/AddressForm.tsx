import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

import { buttonStyle, includes, toastStyle } from '../../../styles';
import { IAddressRequest } from '../../../services/address';
import { addressApi } from '../../../global/atoms';
import { LoadingComponent, Overlay } from '../../../components';
import Postcode from './Postcode';
import { AddressName, AddressFullName } from './AddressInputs';
import { addressRequestState } from '../../../global';
import { queryKeys } from '../../../util';


interface IAddressInput {
  updateActive: boolean;
  setUpdateActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddressInput({ updateActive, setUpdateActive }: IAddressInput) { 
  const addressService = useRecoilValue(addressApi);
  const data = useRecoilValue(addressRequestState);
  const [addClose, setAddClose] = useState(false);
  const method = useForm<IAddressRequest>();
  const client = useQueryClient();
  
  const { mutate, isLoading: loading } = useMutation(({ id, addname, addfullname }: IAddressRequest) => !updateActive
    ? addressService.createAdd({ addname, addfullname })
    : addressService.updateAdd({ id, addname, addfullname }));
  
  useEffect(() => {
    if (!updateActive) {
      return;
    }
    method.reset();
    method.setValue('id', data.id);
    method.setValue('addname', data.addname);
    method.setValue('addfullname', data.addfullname);
  }, [data]);

  const onSubmit = async ({ id, addname, addfullname }: IAddressRequest) => {
    const data = { id, addname, addfullname };
    mutate(data, {
      onSuccess: () => {
        method.reset();
        updateActive ? toastStyle.info('변경되었습니다.') : toastStyle.success('추가되었습니다.');
        setUpdateActive(false);
        client.invalidateQueries(queryKeys.address.all);
        client.invalidateQueries(queryKeys.customer.all);
        client.invalidateQueries(queryKeys.records.list());
      },
      onError: (error: any) => {
        toastStyle.error(error.message);
      }
    })
  };

  const onFindAddress = () => {
    method.setValue('addfullname', '');
    setAddClose(true);
  };

  const onUpdateCancel = () => {
    method.reset();
    setUpdateActive(false);
  };

  return (
    <>
      <FormProvider {...method}>
        <InputGroup onSubmit={method.handleSubmit(onSubmit)}>
          <input {...method.register("id")} style={{ display: "none" }} />
          <AddressName/>
          <AddressFullName onFindAddress={onFindAddress} />
          <ButtonBox>
            {updateActive &&
              <ResetButton type='button' onClick={onUpdateCancel} disabled={loading}>
                {'취소'}
              </ResetButton>}
            <SubmitButton disabled={loading} >
              {!updateActive ? '추가' : '변경'}
            </SubmitButton>
          </ButtonBox>
        </InputGroup>
      </FormProvider>

      {addClose &&
      <Overlay>
        <Postcode setClose={setAddClose} setData={(data: string) => method.setValue('addfullname', data)} />
      </Overlay>}
      {loading &&
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
        </Overlay>}
      </>
  )
}

export default AddressInput;

const InputGroup = styled.form`
  ${includes.flexBox('flex-end', 'flex-start')}
  width: 100%;
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColorFocus};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColorFocus};
  transition: background-color border-color 200ms ease-in-out;
`;

const ButtonBox = styled.div`
  ${includes.flexBox()}
  height: 40px;
`;

const SubmitButton = styled.button`
  ${buttonStyle.open()}
  width: 80px;
  height: 100%;
`;

const ResetButton = styled.button`
  ${buttonStyle.secondary()}
  width: 80px;
  height: 100%;
  margin-right: 5px;
`;
