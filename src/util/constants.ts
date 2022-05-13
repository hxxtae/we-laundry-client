export const regexrObj = {
  signup: {
    username: /^(?=.*[a-zA-Z])[^\sㄱ-ㅎㅏ-ㅣ!@#$%^&*()_\-+[\]{}=:;"'?/.,`~\\|<>]*$/, // 영문 또는 영문 + 숫자 (조합)
    password: /^(?=.*[0-9])(?=.*[a-zA-Z])[^\sㄱ-ㅎㅏ-ㅣ{}[\]()/\\'"`~,;:.<>]*$/, // 영문 + 숫자 (포함)
    tel: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
  },
};

export const inputMessage = {
  required: "필수 입력 항목입니다.",
  maxLen: (maxNum: number) => `최대 ${maxNum}자 까지 입력할 수 있습니다.`,
  minLen: (minNum: number) => `최소 ${minNum}자 까지 입력해야 합니다.`,
};
