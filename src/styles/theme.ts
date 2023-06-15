import { DefaultTheme } from 'styled-components';
import { colors } from './constants';

export const darkTheme: DefaultTheme = {
  bgColor: `${colors.darkSlate}`,
  bgColorSub: `${colors.darkSlateSub}`,
  bgColorThi: `${colors.darkSlate}`,
  bgColorFur: `${colors.darkSlateSub}`,
  bgColorBlur: `${colors.darkSlateSub}`,
  bgColorFocus: `${colors.backgroundNavy}`,
  bgColorHover: `${colors.backgroundDark2}`,
  textColor: `${colors.white}`, 
  borderColor: `${colors.borderDark}`,
  borderColorSub: `${colors.borderDark}`,
  borderColorFocus: `${colors.borderNavy}`,
  sameColor: `${colors.primary}`,
  inputColor: `${colors.backgroundDark}`,
  inputFocusColor: `${colors.borderLight}`,
}

export const lightTheme: DefaultTheme = {
  bgColor: `${colors.white}`,
  bgColorSub: `${colors.light}`,
  bgColorThi: `${colors.light}`,
  bgColorFur: `${colors.white}`,
  bgColorBlur: `${colors.blur}`,
  bgColorFocus: `${colors.white}`,
  bgColorHover: `${colors.backgroundLight}`,
  textColor: `${colors.primary}`, // chk
  borderColor: `${colors.borderLight}`, // chk
  borderColorSub: `${colors.borderGray}`,
  borderColorFocus: `${colors.borderNavy}`,
  sameColor: `${colors.borderLight}`,
  inputColor: `${colors.backgroundLight}`,
  inputFocusColor: `${colors.secondary}`,
}
