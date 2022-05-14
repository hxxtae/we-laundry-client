import styled from 'styled-components';

import { Background, LoadingComponent } from '../../components';
import { includes } from '../../styles';

function LoginLoading() {
  return (
    <Background>
      <Wrapper>
        <LoadingComponent loadingMessage='현재 로그인중 입니다.' />
      </Wrapper>
    </Background>
  );
}

export default LoginLoading;

const Wrapper = styled.div`
  ${includes.flexBox()}
  height: 100%;
`;