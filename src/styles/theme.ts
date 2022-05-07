import { DefaultTheme } from 'styled-components';
import { colors } from './constants';

export const darkTheme: DefaultTheme = {
  bgColor: `${colors.darkSlate}`,
  bgColorSub: `${colors.darkSlateSub}`,
  textColor: `${colors.white}`, 
  borderColor: `${colors.borderDark}`,
  sameColor: `${colors.primary}`,
  inputColor: `${colors.backgroundDark}`,
  inputFocusColor: `${colors.borderLight}`,
}

export const lightTheme: DefaultTheme = {
  bgColor: `${colors.white}`,
  bgColorSub: `${colors.light}`,
  textColor: `${colors.primary}`, // chk
  borderColor: `${colors.borderLight}`, // chk
  sameColor: `${colors.borderLight}`,
  inputColor: `${colors.backgroundLight}`,
  inputFocusColor: `${colors.secondary}`,
}
