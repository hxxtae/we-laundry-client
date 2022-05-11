import { createRef, useImperativeHandle } from 'react';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { darkTheme, lightTheme } from './styles';
import { authApi, themeState } from './global/atoms';
import UserRouter from './routers/UserRouter';
import AuthContext from './AuthContext';

const csrfRef = createRef();

function App() {
  console.log('App');
  
  const theme = useRecoilValue(themeState);
  const authService = useRecoilValue(authApi);
  const thisTheme = theme ? darkTheme : lightTheme;
  
  // NOTE: (비동기 처리, react query 때문에 최초 랜더링 이후 렌더링이 발생한다?)
  const { data: csrfData } = useQuery(["/auth/csrf-token"], () => authService.csrfToken(), {
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
  });
  
  useImperativeHandle(csrfRef, () => csrfData?.data.csrfToken);
  
  return (
    <ThemeProvider theme={{ ...thisTheme }}>
      <AuthContext>
        <UserRouter />
      </AuthContext>
    </ThemeProvider>
  );
}

export default App;
export const fetchCsrfToken = () => csrfRef.current;

