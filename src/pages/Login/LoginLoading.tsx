import styled from 'styled-components';

import { Background, LoadingComponent } from '../../components';
import { includes } from '../../styles';

function LoginLoading() {
  return (
    <Background>
      <Wrapper>
        <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
      </Wrapper>
    </Background>
  );
}

export default LoginLoading;

const Wrapper = styled.div`
  ${includes.flexBox()}
  height: 100%;
`;