import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { reset } from 'styled-reset';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";

import LoginLoading from './pages/Login/LoginLoading';
import App from './App';

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
    overflow: hidden;
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

console.log('Website by %c https://heetae.dev ', `
  font-size: 14px; 
  line-height: 44px;
  color: #e7e7e7;
  background-color: #000000`
);

