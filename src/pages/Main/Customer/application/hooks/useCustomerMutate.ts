import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { customerApi, updateState } from '../../../../../global';
import { CustomerDTO } from '../interface';
import { toastStyle } from '../../../../../styles';
import { queryKeys } from '../../../../../util';

export const useCustomerMutate = () => {
  const customerService = useRecoilValue(customerApi);
  const [ updateActive, setUpdateActive ] = useRecoilState(updateState);
  const client = useQueryClient();

  const { isLoading, mutate } = useMutation(({ id, addid, addname, addfullname, name, dong, ho }: CustomerDTO.ICustomerRequest) =>
    !updateActive ?
      customerService.createCus({ addid, addname, addfullname, name, dong, ho }) : 
      customerService.updateCus({ id, addid, addname, addfullname, name, dong, ho }), {
    onSuccess: () => {
      updateActive ? toastStyle.info('변경되었습니다.') : toastStyle.success('추가되었습니다.');
      setUpdateActive(false);
      client.invalidateQueries(queryKeys.customer.list());
      client.invalidateQueries(queryKeys.records.list());
    },
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  return {
    isLoading,
    mutate,
    client,
    state: {
      updateActive,
      setUpdateActive
    }
  };
}
