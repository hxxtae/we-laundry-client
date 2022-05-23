import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

import { buttonStyle, colors, includes, toastStyle } from '../../../styles';
import { IAddressRequest } from '../../../services/address';
import { addressApi } from '../../../global/atoms';
import { LoadingComponent, Overlay } from '../../../components';
import Postcode from './Postcode';
import AddressName from './AddressInputs/AddressName';
import AddressFullName from './AddressInputs/AddressFullName';

interface IAddressInput {
  addressData: {id: string, addname: string, addfullname: string};
  updateActive: boolean;
  setUpdateActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddressInput({ addressData, updateActive, setUpdateActive }: IAddressInput) { 
  console.log('AddressInput');

  const client = useQueryClient();
  const addressService = useRecoilValue(addressApi);
  const [addClose, setAddClose] = useState(false);
  const method = useForm<IAddressRequest>();

  const { mutate, isLoading: loading } = useMutation(({ id, addname, addfullname }: IAddressRequest) => !updateActive
    ? addressService.createAdd({ addname, addfullname })
    : addressService.updateAdd({ id, addname, addfullname }));
  
  useEffect(() => {
    method.reset();
    method.setValue('id', addressData.id);
    method.setValue('addname', addressData.addname);
    method.setValue('addfullname', addressData.addfullname);
  }, [addressData]);

  const onSubmit = async ({ id, addname, addfullname }: IAddressRequest) => {
    const data = { id, addname, addfullname };
    mutate(data, {
      onSuccess: () => {
        method.reset();
        updateActive ? toastStyle.info('변경되었습니다.') : toastStyle.success('추가되었습니다.');
        setUpdateActive(false);
        client.invalidateQueries(["/address", "fetch"]);
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
          <AddressName />
          <AddressFullName onFindAddress={onFindAddress} />
          <ButtonBox>
            <SubmitButton updateChk={updateActive + ""} disabled={loading} >
              {!updateActive ? '추가' : '변경'}
            </SubmitButton>
            {updateActive &&
              <ResetButton type='button' onClick={onUpdateCancel} disabled={loading}>
                {'취소'}
              </ResetButton>}
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
  ${includes.flexBox('flex-end', 'center')}
`;

const ButtonBox = styled.div`
  ${includes.flexBox()}
`;

const SubmitButton = styled.button<{updateChk: string}>`
  ${buttonStyle.primary()}
  width: 80px;
  margin-right: 5px;
`;

const ResetButton = styled.button`
  ${buttonStyle.secondary()}
  width: 80px;
`;
