/*
=============================
  media
=============================
*/
export const mediaSize = {
  BREAKE_POINT_TL_S: "768px",
  BREAKE_POINT_TL_L: "992px",
  BREAKE_POINT_PC_S: "1200px",
  BREAKE_POINT_PC_L: "1600px",
}
/*
=============================
  colors
=============================
*/
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
  blur: '#f9f9f9',
  
  borderLight: '#E0E2E7',
  borderDark: '#30363d',
  borderGray: '#bcc0c7',
  backgroundLight: '#F7F8FA',
  backgroundDark: '#171e28',
  
  blue: '#3DA5F5',
  blueDark: '#3186C4',
  blueLight: '#ECF6FE',
  red: '#F86D7D',
  redDark: '#dd616f',
  green: '#22C58B',
  greenDark: '#1dac7a'
};
/*
=============================
  any
=============================
*/
export const headerHeight = {
  tablet: '56px', // 16 + 24 + 16
  pc: '68px', // 20 + 28 + 20
}

export const sidebarWidth = {
  tablet: '62px',
  pc: '75px',
}

export const mainContextPaddingPc = '20px';
export const mainContextPaddingTablet = '16px';

export const zIndexes = {
  themeButton: 90,
  overlay: 100,
  overlayContext: 200,
}

export const linePosition = [
  {
    tabletPos: '70px',
    pcPos: '88px',
  },
  {
    tabletPos: '124px',
    pcPos: '154px',
  },
  {
    tabletPos: '222px',
    pcPos: '264px',
  },
  {
    tabletPos: '274px',
    pcPos: '332px',
  },
  {
    tabletPos: '334px',
    pcPos: '400px',
  },
  {
    tabletPos: '428px',
    pcPos: '508px',
  },
];

export const lineSecLocation = {
  Top: {
    tabletDeg: '48deg',
    pcDeg: '48deg',
  },
  Middle: {
    tabletDeg: '0deg',
    pcDeg: '0deg',
  },
  Bottom: {
    tabletDeg: '-48deg',
    pcDeg: '-48deg',
  },
}

export const lineThiLocation = {
  Top: {
    tabletX: '-26px',
    tabletY: '54px',
    pcX: '-30px',
    pcY: '67px',
  },
  Middle: {
    tabletX: '-26px',
    tabletY: '0px',
    pcX: '-30px',
    pcY: '0px',
  },
  Bottom: {
    tabletX: '-26px',
    tabletY: '-54px',
    pcX: '-30px',
    pcY: '-67px',
  },
}

export const descText = {
  text1: `[고객]을 선택하고 [품목]을 선택하여 새로운 주문을 접수할 수 있습니다.`,
  text2: `[접수된 주문]을 조회할 수 있으며, [원하는 주문]을 찾을 수 있도록 검색이 가능합니다.`,
  text3: `[고객의 정보]를 고객주소와 함께 확인하여 관리할 수 있습니다`,
  text4: `[카테고리] 와 [품목]을 유연하게 관리할 수 있습니다. `,
  text5: `[고객의 주소]를 유연하게 관리할 수 있습니다. `,
  text6: `[오늘 매출]과 [월별 매출]을 테이블과 차트로 시각화된 데이터를 확인하실 수 있습니다.`
}
