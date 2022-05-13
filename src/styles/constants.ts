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

export const headerHeight = '72px'; // 20 + 20 + 32
export const mainContextPaddingPc = '20px';
export const mainContextPaddingTablet = '16px';

export const zIndexes = {
  overlay: 10,
  overlayContext: 20,
}

export const linePosition = {
  y1: {
    tabletY: '0px',
    pcY: '0px',
  },
  y2: {
    tabletY: '54px',
    pcY: '64px',
  },
  y3: {
    tabletY: '152px',
    pcY: '174px',
  },
  y4: {
    tabletY: '204px',
    pcY: '242px',
  },
  y5: {
    tabletY: '264px',
    pcY: '310px',
  },
  y6: {
    tabletY: '358px',
    pcY: '418px',
  },
}

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
  step1: (weight: number) => `상품과 갯수를 선택하여 새로운 주문을 작성할 수 있습니다.`,
  step2: (weight: number) => `작성된 주문을 조회할 수 있습니다.작성된 주문을 찾을 수 있도록 검색이 가능합니다.`,
}