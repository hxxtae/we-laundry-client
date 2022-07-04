import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { inputStyle, buttonStyle, includes, media, colors } from '../../styles';
import { inputMessage } from '../../util';
import { authApi, userState } from '../../global/atoms';
import { ErrorMessage } from '../../components';
import LoginContext from './LoginContext';

interface ILoginForm {
  username: string;
  password: string;
}

function Login() {
  const history = useHistory();
  const authService = useRecoilValue(authApi);
  const setUser = useSetRecoilState(userState);
  const { register, setValue, handleSubmit, formState: { errors }, setError } = useForm<ILoginForm>();
  const { mutate } = useMutation((loginData: ILoginForm) => authService.login(loginData));

  const onSubmit = async ({ username, password }: ILoginForm) => {
    const data = { username, password };
    mutate(data, {
      onSuccess: () => {
        setValue('username', '');
        setValue('password', '');
        setUser(data.username);
      },
      onError: (error: any) => {
        setError('username', { type: 'custom', message: error.message });
        setError('password', { type: 'custom', message: error.message });
      },
    })
  }

  const onSingup = () => {
    history.push('/signup');
  }

  return (
    <LoginContext>
      <InputBox>
        <Logo>
          <LogoImg src={'./assets/svg/welaundry_medium_v2_darkblue.svg'} />
        </Logo>
        <Title>{"로그인"}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            err={errors.username?.message}
            {...register('username', {
              required: inputMessage.required,
              minLength: { value: 2, message: inputMessage.minLen(2) },
              maxLength: { value: 10, message: inputMessage.maxLen(10) }
            })}
            placeholder="닉네임"
            autoComplete='off' />
          <ErrorMessage message={errors.username?.message} />
          <Input
            err={errors.password?.message}
            type="password"
            {...register('password', {
              required: inputMessage.required,
              minLength: { value: 6, message: inputMessage.minLen(6) },
              maxLength: { value: 18, message: inputMessage.maxLen(18) }
            })}
            placeholder="비밀번호"
            autoComplete='off' />
          <ErrorMessage message={errors.password?.message} />
          <ButtonBox>
            <Submit>{"확인"}</Submit>
            <Line aria-hidden />
            <Button type='button' onClick={onSingup}>{"가입하기"}</Button>
          </ButtonBox>
        </Form>
        <Info>{"@ 2022 WeLaundry Inc. All Right Reserved"}</Info>
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
  top: 40px;
  width: 150px;
  height: 60px;

  @media ${media.pc_s} {
    top: 85px;
    width: 200px;
    height: 80px;
  }
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input<{err: string | undefined}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}`};
  color: ${(props) => props.theme.textColor};
  
  &:nth-of-type(2) {
    margin-top: 10px;
  }

  &:focus {
    border-color: ${(props) => props.err ? `${colors.red}` : ''};
  }
`;

const ButtonBox = styled.div`
  ${includes.flexBox()}
  flex-direction: column;
  margin-top: 20px;
`;

const Submit = styled.button`
  ${buttonStyle.primary()}
  width: 100%;
  letter-spacing: 2px;
`;

const Button = styled.button`
  ${buttonStyle.outline()}
  display: block;
  width: 100%;
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
