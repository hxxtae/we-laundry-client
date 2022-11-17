import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';

import { customerApi } from '../../../../../global';
import { toastStyle } from '../../../../../styles';
import { queryKeys } from '../../../../../util';

interface ICustomerDel {
  isDelLoading: boolean;
  mutateDel: UseMutateFunction<AxiosResponse<any, any>, any, string, unknown>;
}

export const useCustomerDel = (): ICustomerDel => {
  const customerService = useRecoilValue(customerApi);
  const client = useQueryClient();

  const { mutate, isLoading } = useMutation((id: string) => customerService.deleteCus(id), {
    onSuccess: () => {
      client.invalidateQueries(queryKeys.customer.list());
      client.invalidateQueries(queryKeys.records.list());
      toastStyle.info('삭제되었습니다.');
    },
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  return {
    isDelLoading: isLoading,
    mutateDel: mutate
  };
}
