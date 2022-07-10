import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { authApi, userState } from '../../global';
import { queryKeys } from '../../util';

interface IAuthFetch {
  user: string | undefined;
  isLoading: boolean;
}

export const useAuthFetch = (): IAuthFetch => {
  const [user, setUser] = useRecoilState(userState);
  const authService = useRecoilValue(authApi);

  // NOTE: (비동기 처리, react query 때문에 최초 랜더링 이후 렌더링이 발생한다?)
  const { isLoading } = useQuery(queryKeys.auth.me(), () => authService.me(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
    onSuccess: (data) => {
      setUser(data?.data.username);
    },
  }); 

  return { user, isLoading }
}
