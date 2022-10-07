import { AxiosResponse } from 'axios';
import { UseMutateFunction, useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import { authApi } from '../../../../global';
import { dto } from '../interface';

interface useSignup {
  isLoading: boolean;
  mutate: UseMutateFunction<AxiosResponse<any, any>, unknown, dto.ISignup, unknown>;
}

export const useSignup = (): useSignup => {
  const authService = useRecoilValue(authApi);
  const { isLoading, mutate } = useMutation((signData: dto.ISignup) => authService.signup(signData));

  return { isLoading, mutate };
}
