import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';

import { customerApi } from '../../../../../global';
import { toastStyle } from '../../../../../styles';
import { queryKeys } from '../../../../../util';

import { CustomerDTO } from '../interface';
import { useCustomerResetAtom } from './useCustomerResetAtom';

interface ICustomerIns {
  isInsLoading: boolean;
  mutateIns: UseMutateFunction<AxiosResponse<any, any>, any, CustomerDTO.ICustomerRequest, unknown>;
}

export const useCustomerIns = (): ICustomerIns => {
  const customerService = useRecoilValue(customerApi);
  const client = useQueryClient();

  const { isLoading, mutate } = useMutation(({ id, addid, addname, addfullname, name, dong, ho }: CustomerDTO.ICustomerRequest) =>
    customerService.createCus({ addid, addname, addfullname, name, dong, ho }), {
    onSuccess: () => {
      toastStyle.success('추가되었습니다.');
      client.invalidateQueries(queryKeys.customer.list());
    },
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });
  

  return {
    isInsLoading: isLoading,
    mutateIns: mutate,
  };
}
