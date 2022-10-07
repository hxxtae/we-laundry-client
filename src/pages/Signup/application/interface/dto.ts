export interface ISignup {
  username: string; // 닉네임
  password: string; // 비밀번호
  tel: string; // 전화번호
};

export type ISignupForm = ISignup & {
  passwordRepeat: string; // 비밀번호 확인
}
