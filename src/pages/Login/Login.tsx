import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { buttonStyle, includes, media, colors, dragging } from '../../styles';
import { authApi, userState } from '../../global/atoms';
import { LoginUserName, LoginPassword } from './LoginInputs';
import LoginContext from './LoginContext';

interface ILoginForm {
  username: string;
  password: string;
}

function Login() {
  const history = useHistory();
  const authService = useRecoilValue(authApi);
  const setUser = useSetRecoilState(userState);
  const method = useForm<ILoginForm>();
  const { isLoading, mutate } = useMutation((loginData: ILoginForm) => authService.login(loginData));

  const onSubmit = ({ username, password }: ILoginForm) => {
    const data = { username, password };
    isLoading || mutate(data, {
      onSuccess: () => {
        method.setValue('username', '');
        method.setValue('password', '');
        setUser(data.username);
      },
      onError: (error: any) => {
        method.setError('username', { type: 'custom', message: error.message });
        method.setError('password', { type: 'custom', message: error.message });
      },
    })
  }

  const onInterviewerSubmit = () => {
    const data = { username: process.env.REACT_APP_INTERVIEWER_ID!, password: process.env.REACT_APP_INTERVIEWER_PW! };
    isLoading || mutate(data, {
      onSuccess: () => {
        setUser(data.username);
      },
      onError: (data: any) => {
        console.log(`interviewer Login Error: ${data.message}`);
      }
    })
  }

  const onSingup = () => {
    history.push('/signup');
  }

  return (
    <LoginContext>
      <InputBox>
        <Logo>
          <LogoImg src={process.env.PUBLIC_URL + '/assets/svg/welaundry_medium_v2_darkblue.svg'} draggable='false' />
        </Logo>
        <FormProvider {...method}>
          <Form onSubmit={method.handleSubmit(onSubmit)}>
            <LoginUserName />
            <LoginPassword />
            <ButtonBox>
              <Submit interviewer={false}>{"시작하기"}</Submit>
              <Line aria-hidden />
              <Button type='button' onClick={onSingup}>{"가입하기"}</Button>
              <Submit type='button' interviewer={true} onClick={onInterviewerSubmit}>{"둘러보기"}</Submit>
            </ButtonBox>
          </Form>
          </FormProvider>
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

const Form = styled.form`
  width: 100%;
`;

const ButtonBox = styled.div`
  ${includes.flexBox()}
  flex-direction: column;
  margin-top: 20px;
`;

const Submit = styled.button<{ interviewer: boolean }>`
  ${({ interviewer }) => buttonStyle.primary(interviewer)}
  margin-top: ${({ interviewer }) => interviewer ? `40px` : `0`};
  width: 100%;
  letter-spacing: 1.5px;
`;

const Button = styled.button`
  ${buttonStyle.outline()}
  display: block;
  width: 100%;
  letter-spacing: 1.5px;
`;

const Line = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.sameColor};
  width: 90%;
  margin: 7px 0;
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
