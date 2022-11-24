import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { descState } from '../../../global';
import { buttonStyle, colors, includes, media } from '../../../styles';
import { mainDescStorage } from '../../../util';

import { useSignup } from '../application/hooks';
import { dto } from '../application/interface';
import SignupPassword from './SignupPassword';
import SignupPasswordConfirm from './SignupPasswordConfirm';
import SignupTel from './SignupTel';
import SignupUserName from './SignupUserName';

function SignupForm() {
  const setDesc = useSetRecoilState(descState);
  const method = useForm<dto.ISignupForm>();
  const { isLoading, mutate } = useSignup();
  const history = useHistory();

  const onSubmit = useCallback(({ username, password, tel }: dto.ISignup) => {
    const data = { username, password, tel };
    console.log(data);
    isLoading || mutate(data, {
      onSuccess: () => {
        method.reset();
        mainDescStorage.set();
        setDesc(true);

        if (window.confirm('회원가입이 완료되었습니다.\n\n로그인 화면으로 이동하시겠습니까?')) {
          history.push('/');
        }
      },
      onError: (error: any) => {
        method.setError('username', { type: 'custom', message: error.message });
      }
    });
  }, [isLoading]);

  const onLoginPage = () => {
    history.push('/');
  }

  return (
    <InputGroup>
      <Title>{'회원가입'}</Title>
      <FormProvider {...method}>
        <Form onSubmit={method.handleSubmit(onSubmit)}>
          <SignupUserName />
          <SignupPassword />
          <SignupPasswordConfirm />
          <SignupTel />
          <ButtonBox>
            <Button disabled={isLoading}>{'회원가입하기'}</Button>
            <Button type='button' onClick={onLoginPage}>{'로그인하기'}</Button>
          </ButtonBox>
        </Form>
      </FormProvider>
    </InputGroup>
  )
}

export default SignupForm;

const InputGroup = styled.div`
  ${includes.flexBox()}
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
  width: 100%;

  @media ${media.pc_s} {
    font-size: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid ${colors.borderLight};
`;

const ButtonBox = styled.div`
  ${includes.flexBox()};
  margin-top: 30px;
`;

const Button = styled.button`
  ${buttonStyle.primary()}
  width: 100%;

  &:last-child {
    ${buttonStyle.outline}
    margin-left: 10px;
  }
`;
