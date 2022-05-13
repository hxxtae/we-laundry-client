import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRef } from 'react';
import styled from 'styled-components';

import { colors, includes, media, buttonStyle, inputStyle } from '../../styles';
import { inputMessage, regexrObj } from '../../util';
import { authApi, descState } from '../../global/atoms';
import { Background, Containers, ErrorMessage, InputTitles } from '../../components';

interface ISignup {
  username: string; // 닉네임
  password: string; // 비밀번호
  tel: string; // 전화번호
}

type ISignupForm = ISignup & {
  passwordRepeat: string; // 비밀번호 확인
}

function Signup() {
  console.log('Signup');

  const authService = useRecoilValue(authApi);
  const setDesc = useSetRecoilState(descState);
  const password = useRef('');
  const history = useHistory();
  const { register, setValue, handleSubmit, formState: { errors }, watch, setError } = useForm<ISignupForm>();
  const { mutate } = useMutation((signData: ISignup) => authService.signup(signData));
  password.current = watch('password', '');

  const pwdValidate = (value: string) =>
    value === password.current || '비밀번호가 일치하지 않습니다.'

  const onSubmit = async ({ username, password, tel }: ISignup) => {
    const data = { username, password, tel };
    mutate(data, {
      onSuccess: () => {
        setValue('username', '');
        setValue('password', '');
        setValue('passwordRepeat', '');
        setValue('tel', '');

        localStorage.setItem('mainDesc', JSON.stringify('true'));
        setDesc(true);

        if (window.confirm('회원가입이 완료되었습니다.\n\n로그인 화면으로 이동하시겠습니까?')) {
          history.push('/');
        }
      },
      onError: (error: any) => {
        setError('username', { type: 'custom', message: error.message });
      }
    });
  }

  const onLogin = () => {
    history.push('/');
  }

  return (
    <Background>
      <Containers>
        <Section>
          <Wrapper>
            <InputBox>
              <Title>{'회원가입'}</Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <InputTitles
                  title='닉네임'
                  des='다른 유저와 겹치지 않는 영문 별명을 입력해주세요. (2~10자)' />
                <Input
                  err={errors.username?.message}
                  autoComplete='off'
                  {...register('username',
                    {
                      required: inputMessage.required,
                      minLength: { value: 2, message: inputMessage.minLen(2) },
                      maxLength: { value: 10, message: inputMessage.maxLen(10) },
                      pattern: {
                        value: regexrObj.signup.username, message: '영문, 영문 + 숫자 조합이여야 합니다.'
                      }
                    })}
                />
                <ErrorMessage message={errors.username?.message} />
                <InputTitles
                  title='비밀번호'
                  des='영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.' />
                <Input
                  type='password'
                  err={errors.password?.message}
                  {...register('password',
                    {
                      required: inputMessage.required,
                      maxLength: { value: 18, message: inputMessage.maxLen(18) },
                      minLength: { value: 6, message: inputMessage.minLen(6) },
                      pattern: {
                        value: regexrObj.signup.password, message: '영문 + 숫자를 포함하여야 합니다. (한글, 일부 특수문자 불가)'
                      }
                    })}
                />
                <ErrorMessage message={errors.password?.message} />
                <InputTitles title='비밀번호 확인' />
                <Input
                  type='password'
                  err={errors.passwordRepeat?.message}
                  {...register('passwordRepeat',
                    {
                      required: inputMessage.required,
                      validate: pwdValidate
                    })}
                />
                <ErrorMessage message={errors.passwordRepeat?.message} />
                <InputTitles
                  title='전화번호'
                  des='서비스 사용을 위해 전화번호 인증이 필요합니다.' />
                <Input
                  err={errors.tel?.message}
                  autoComplete='off'
                  {...register('tel',
                    {
                      required: inputMessage.required,
                      pattern: { value: regexrObj.signup.tel, message: '잘못된 입력 입니다.'}
                    })}
                />
                <ErrorMessage message={errors.tel?.message} />
                <ButtonBox>
                  <Button>{'회원가입하기'}</Button>
                  <Button type='button' onClick={onLogin}>{'로그인하기'}</Button>
                </ButtonBox>
              </Form>
            </InputBox>
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
  padding: 40px;
  transition: background-color border-color 200ms ease-in-out;

  @media ${media.tablet_s} {
    width: 400px;
  }
`;

const InputBox = styled.div`
  ${includes.flexBox()}
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};;
  margin-bottom: 20px;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid ${colors.borderLight};
`;

const Input = styled.input<{err?: string}>`
  ${inputStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border-color: ${(props) => props.err ? `${colors.red}` : `${props.theme.borderColor}` };
  color: ${(props) => props.theme.textColor};

  &:focus {
    border-color: ${(props) => props.err ? `${colors.red}` : '' };
  }
`;

const ButtonBox = styled.div`
  ${includes.flexBox()};
  margin-top: 30px;
`;

const Button = styled.button`
  ${buttonStyle.primary}
  width: 100%;

  &:last-child {
    ${buttonStyle.outline}
    margin-left: 10px;
  }
`;
