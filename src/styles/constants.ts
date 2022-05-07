export const mediaSize = {
  BREAKE_POINT_TL_S: "768px",
  BREAKE_POINT_TL_L: "992px",
  BREAKE_POINT_PC_S: "1200px",
  BREAKE_POINT_PC_L: "1600px",
}

export const colors = {
  white: '#FFF',
  black: '#000',

  light: '#e7e7e7',
  dark: '#191A20',

  darkSlate: '#0d1117',
  darkSlateSub: '#010409',
  darkSlateGray: '#424953',
  
  primary: '#3F4150',
  secondary: '#8C8D96',
  tertiary: '#B2B3B9',
  
  borderLight: '#E0E2E7',
  borderDark: '#30363d',
  backgroundLight: '#F7F8FA',
  backgroundDark: '#171e28',
  
  blue: '#3DA5F5',
  blueDark: '#3186C4',
  blueLight: '#ECF6FE',
  red: '#F86D7D',
  green: '#22C58B',
};

export const inputMessage = {
  required: "필수 입력 항목입니다.",
  maxLen: (maxNum: number) => `최대 ${maxNum}자 까지 입력할 수 있습니다.`,
  minLen: (minNum: number) => `최소 ${minNum}자 까지 입력해야 합니다.`
}
