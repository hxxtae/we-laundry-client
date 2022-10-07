import { createRef, useImperativeHandle } from 'react';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { darkTheme, lightTheme } from './styles';
import { themeState } from './global/atoms';
import { useCsrfFetch } from './hooks';
import AuthContext from './AuthContext';
import UserRouter from './routers/UserRouter';

const csrfRef = createRef();

function App() {  
  const theme = useRecoilValue(themeState);
  const thisTheme = theme ? darkTheme : lightTheme;

  const { csrfData } = useCsrfFetch();
  
  useImperativeHandle(csrfRef, () => csrfData);
  
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

