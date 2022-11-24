import styled from 'styled-components';

import { Background, Containers } from '../../components';
import { includes, media } from '../../styles';
import { SignupForm } from './SignupForm';

function Signup() {

  return (
    <Background>
      <Containers>
        <Section>
          <Wrapper>
            <SignupForm />
          </Wrapper>
        </Section>
      </Containers>
    </Background>
  )
}

export default Signup;

const Section = styled.section`
  ${includes.flexBox()}
  height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  overflow: hidden;
  padding: 30px 40px;
  transition: background-color border-color 200ms ease-in-out;

  @media ${media.tablet_s} {
    width: 400px;
  }

  @media ${media.pc_s} {
    padding: 40px;
  }
`;
