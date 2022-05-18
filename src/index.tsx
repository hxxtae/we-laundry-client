import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import ReactDOM from 'react-dom/client';

import App from './App';

console.log('Index');

const client = new QueryClient();

const GlobalStyled = createGlobalStyle`
  ${reset};

  * {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-content-zooming: none;
    -ms-touch-action: pan-x pan-y;
  }

  html {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    
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
      <RecoilRoot>
        <GlobalStyled />
        <App/>
      </RecoilRoot>
    </QueryClientProvider>
  //</React.StrictMode>
);

