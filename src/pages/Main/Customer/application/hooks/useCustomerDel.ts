import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { customerApi } from '../../../../../global';
import { toastStyle } from '../../../../../styles';
import { queryKeys } from '../../../../../util';

export const useCustomerDel = () => {
  const customerService = useRecoilValue(customerApi);
  const client = useQueryClient();

  const { mutate, isLoading: isMutating } = useMutation((id: string) => customerService.deleteCus(id), {
    onSuccess: () => {
      client.invalidateQueries(queryKeys.customer.list());
      client.invalidateQueries(queryKeys.records.list());
      toastStyle.info('삭제되었습니다.');
    },
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  return { isMutating, mutate };
}
