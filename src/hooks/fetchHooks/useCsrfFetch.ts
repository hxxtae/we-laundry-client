import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { authApi } from '../../global';
import { queryKeys } from '../../util';

interface ICsrfFetch {
  csrfData: string | undefined;
}

export const useCsrfFetch = (): ICsrfFetch => {
  const authService = useRecoilValue(authApi);
  
  // NOTE: (비동기 처리, react query 때문에 최초 랜더링 이후 렌더링이 발생한다?)
  const { data: fetchData } = useQuery(queryKeys.auth.csrf(), () => authService.csrfToken(), {
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
  });

  return { csrfData: fetchData?.data.csrfToken };
}
