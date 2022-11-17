import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AxiosResponse } from 'axios';

import { customerApi } from '../../../../../global';
import { toastStyle } from '../../../../../styles';
import { queryKeys } from '../../../../../util';

import { updateState } from '../atom';
import { CustomerDTO } from '../interface';

interface ICustomerUpd {
  isUpdLoading: boolean;
  mutateUpd: UseMutateFunction<AxiosResponse<any, any>, any, CustomerDTO.ICustomerRequest, unknown>;
}

export const useCustomerUpd = (): ICustomerUpd => {
  const customerService = useRecoilValue(customerApi);
  const setUpdateActive = useSetRecoilState(updateState);
  const client = useQueryClient();

  const { isLoading, mutate } = useMutation(({ id, addid, addname, addfullname, name, dong, ho }: CustomerDTO.ICustomerRequest) =>
    customerService.updateCus({ id, addid, addname, addfullname, name, dong, ho }), {
    onSuccess: () => {
      toastStyle.info('변경되었습니다.');
      setUpdateActive(false);
      client.invalidateQueries(queryKeys.customer.list());
      client.invalidateQueries(queryKeys.records.list());
    },
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  return {
    isUpdLoading: isLoading,
    mutateUpd: mutate,
  };
}
