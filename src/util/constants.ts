/*
=============================
  input validation
=============================
*/
export const regexrObj = {
  signup: {
    username: /^(?=.*[a-zA-Z])[^\s가-하ㄱ-ㅎㅏ-ㅣ!@#$%^&*()_\-+[\]{}=:;"'?/.,`~\\|<>]*$/, // 영문 반드시 포함 : 영문 또는 영문 + 숫자 (조합)
    password: /^(?=.*[0-9])(?=.*[a-zA-Z])[^\s가-하ㄱ-ㅎㅏ-ㅣ{}[\]()/\\'"`~,;:.<>]*$/, // 영문, 숫자 반드시 포함 : 영문 + 숫자 (포함)
    tel: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
  },
  includeKorAndEng: /^(?=.*[a-zA-Z가-하ㄱ-ㅎㅏ-ㅣ])[^!@#$%^&*()_\-+[\]{}=:;"'?/.,`~\\|<>]*$/, // 한글, 영문 반드시 포함
  notSpaceAndSpecial: /^[^\s!@#$%^&*()_\-+[\]{}=:;"'?/.,`~\\|<>]*$/, // 특수문자와 공백 제외
  notOnlySpecial: /^[^!@#$%^&*()_\-+[\]{}=:;"'?/.,`~\\|<>]*$/, // 특수문자 입력 불가
  notPartSpecial: /^[^!@#$%^&*()\-+[\]{}=:;"'?.`~\\|<>]*$/, // 특수문자 일부 입력 불가, (, _ /) 허용
  notFirstZero: /^[^0].*$/, // 맨 앞에 0이 올 수 없음.
};

export const inputMessage = {
  required: "필수 입력 항목입니다.",
  maxLen: (maxNum: number) => `최대 ${maxNum}자 까지 입력할 수 있습니다.`,
  minLen: (minNum: number) => `최소 ${minNum}자 까지 입력해야 합니다.`,
};

/*
=============================
  number check
=============================
*/
export const isNumberCheck = (value: string | number) => {
  let thisValue = value ?? 0; // NOTE: null & undefined is 0
  if (typeof thisValue !== 'number') {
    thisValue = Number(thisValue);

    // NOTE: NaN Check
    if (thisValue !== thisValue) {
      console.error("Error: value is Not a Number");
      return false;
    }
  }
  
  // NOTE: Infinity & -Infinity & NaN Check
  if (!isFinite(thisValue)) {
    console.error("Error: value is Infinity & -Infinity");
    return false;
  }
  return thisValue;
}

export const isIntegerCheck = (value: number) => {
  const numberValue = isNumberCheck(value);
  if (!Number.isInteger(numberValue)) {
    console.error("Error: value is Not Integer");
    return false;
  }
  return numberValue;
}

/*
=============================
  public
=============================
*/
export interface IloginKey {
  id: number;
  path: string;
}

export const loginImg: IloginKey[] = [
  {
    id: 1,
    path: `${process.env.PUBLIC_URL}/assets/img/img_login.jpg`,
  },
  {
    id: 2,
    path: `${process.env.PUBLIC_URL}/assets/img/img_login3.jpg`,
  },
  {
    id: 3,
    path: `${process.env.PUBLIC_URL}/assets/img/img_login4.jpg`,
  },
];

