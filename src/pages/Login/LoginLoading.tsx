import styled from 'styled-components';

import { Background } from '../../components';
import LoadingLogo from '../../components/Loadings/LoadingLogo';
import { includes } from '../../styles';

function LoginLoading() {
  return (
    <Background>
      <Wrapper>
        <LoadingLogo />
      </Wrapper>
    </Background>
  );
}

export default LoginLoading;

const Wrapper = styled.div`
  ${includes.flexBox()}
  height: 100%;
`;