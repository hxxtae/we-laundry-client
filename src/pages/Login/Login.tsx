import styled from 'styled-components';

import { includes, media, colors, dragging } from '../../styles';
import LoginContext from './LoginContext';
import LoginForm from './LoginForm';

function Login() {

  return (
    <LoginContext>
      <InputBox>
        <Logo>
          <LogoImg src={process.env.PUBLIC_URL + '/assets/svg/welaundry_medium_v2_darkblue.svg'} draggable='false' />
        </Logo>
        <LoginForm />
        <Info>{"All Right Reserved © 2022 hxxtae."}</Info>
      </InputBox>
    </LoginContext>
  )
}

export default Login;

const InputBox = styled.div`
  ${includes.flexBox()}
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0 40px;
  box-shadow: -2px 0 20px rgba(0, 0, 0, .5);
  transition: background-color 200ms ease-in-out;

  @media ${media.tablet_l} {
    width: 35%;
  }

  @media ${media.pc_s} {
    width: 30%;
  }

  @media ${media.pc_l} {
    width: 25%;
    padding: 0 50px;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 30px;
  width: 150px;
  height: 60px;

  @media ${media.pc_s} {
    top: 70px;
    width: 200px;
    height: 80px;
  }

  ${dragging.stop()}
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.p`
  position: absolute;
  bottom: 40px;
  color: ${colors.secondary};
  font-size: 10px;

  @media ${media.pc_s} {
    font-size: 12px;
  }
`;
