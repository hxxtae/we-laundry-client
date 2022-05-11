import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { authApi, userState } from './global/atoms';
import NonUserRouter from './routers/NonUserRouter';
import ThemeButton from './components/ThemeButton';
import LoginLoading from './pages/Login/LoginLoading';

interface IAuthContextProps {
  children: JSX.Element;
}

function AuthContext({ children }: IAuthContextProps) {
  console.log('AuthContext');
  
  const [user, setUser] = useRecoilState(userState);
  const authService = useRecoilValue(authApi);

  // NOTE: (비동기 처리, react query 때문에 최초 랜더링 이후 렌더링이 발생한다?)
  const { isLoading } = useQuery(["/auth/me"], () => authService.me(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
    onSuccess: (data) => {
      setUser(data?.data.username);
    },
  });

  return (
    <>
      {isLoading ?
        <LoginLoading /> :
        user ?
          children :
          <NonUserRouter />
      }
      <ThemeButton />
    </>
  )
}

export default AuthContext;

