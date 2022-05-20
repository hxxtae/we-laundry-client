import { DefaultTheme } from 'styled-components';
import { colors } from './constants';

export const darkTheme: DefaultTheme = {
  bgColor: `${colors.darkSlate}`,
  bgColorSub: `${colors.darkSlateSub}`,
  bgColorThi: `${colors.darkSlate}`,
  bgColorFur: `${colors.darkSlateSub}`,
  textColor: `${colors.white}`, 
  borderColor: `${colors.borderDark}`,
  borderColorSub: `${colors.borderDark}`,
  sameColor: `${colors.primary}`,
  inputColor: `${colors.backgroundDark}`,
  inputFocusColor: `${colors.borderLight}`,
}

export const lightTheme: DefaultTheme = {
  bgColor: `${colors.white}`,
  bgColorSub: `${colors.light}`,
  bgColorThi: `${colors.light}`,
  bgColorFur: `${colors.white}`,
  textColor: `${colors.primary}`, // chk
  borderColor: `${colors.borderLight}`, // chk
  borderColorSub: `${colors.borderGray}`,
  sameColor: `${colors.borderLight}`,
  inputColor: `${colors.backgroundLight}`,
  inputFocusColor: `${colors.secondary}`,
}
