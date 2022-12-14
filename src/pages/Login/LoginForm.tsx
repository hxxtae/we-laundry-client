import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { pathStr } from '../../routers/path';
import { authApi, userState } from '../../global';
import { buttonStyle, includes } from '../../styles';
import { LoginPassword, LoginUserName } from './LoginInputs';
import { LoadingButtonItem } from '../../components';

interface ILoginForm {
  username: string;
  password: string;
}

function LoginForm() {
  const history = useHistory();
  const [interviewer, setInterviewer] = useState(false);
  const authService = useRecoilValue(authApi);
  const setUser = useSetRecoilState(userState);
  const method = useForm<ILoginForm>();
  const { isLoading, mutate } = useMutation((loginData: ILoginForm) => authService.login(loginData));

  const onSubmit = ({ username, password }: ILoginForm) => {
    const data = { username, password };
    setInterviewer(false);
    isLoading || mutate(data, {
      onSuccess: () => {
        method.setValue('username', '');
        method.setValue('password', '');
        history.push(pathStr('pos'));
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
    setInterviewer(true);
    isLoading || mutate(data, {
      onSuccess: () => {
        history.push(pathStr('pos'));
        setUser(data.username);
      },
      onError: (data: any) => {
        console.log(`interviewer Login Error: ${data.message}`);
      }
    })
  }

  const onSingup = () => {
    history.push(pathStr('signup'));
  }

  const showLoading = useCallback((text: string, thisBtn: boolean) => {
    if (interviewer !== thisBtn) return text;
    return isLoading ? <><LoadingButtonItem />{text}</> : text
  }, [isLoading, interviewer]);

  return (
    <FormProvider {...method}>
      <Form onSubmit={method.handleSubmit(onSubmit)}>
        <LoginUserName />
        <LoginPassword />
        <ButtonBox>
          <Submit interviewer={false}>{showLoading("시작하기", false)}</Submit>
          <Line aria-hidden />
          <Button type='button' onClick={onSingup}>{"가입하기"}</Button>
          <Submit type='button' interviewer={true} onClick={onInterviewerSubmit}>{showLoading("둘러보기", true)}</Submit>
        </ButtonBox>
      </Form>
    </FormProvider>
  )
}

export default LoginForm;

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
