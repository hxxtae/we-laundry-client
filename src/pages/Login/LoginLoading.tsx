import styled from 'styled-components';

import { Background } from '../../components';
import { includes } from '../../styles';
import LoadingLogo from '../../components/Loadings/LoadingLogo';

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