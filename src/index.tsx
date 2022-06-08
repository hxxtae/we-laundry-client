import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import App from './App';
import { Suspense } from 'react';
import LoginLoading from './pages/Login/LoginLoading';

console.log('Index');

const client = new QueryClient();

const GlobalStyled = createGlobalStyle`
  ${reset};

  * {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 14px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-content-zooming: none;
    -ms-touch-action: pan-x pan-y;
  }

  html {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12px;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12px;
    
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;
    &:focus {
      box-shadow: none;
      outline: none;
    }
  }
  
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  //<React.StrictMode>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilRoot>
        <GlobalStyled />
        <ToastContainer />
        <Suspense fallback={<LoginLoading />}>
          <App />
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  //</React.StrictMode>
);

