// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    bgColorSub: string;
    bgColorThi: string;
    bgColorFur: string;
    bgColorBlur: string;
    bgColorFocus: string;
    bgColorHover: string;
    textColor: string;
    borderColor: string;
    borderColorSub: string;
    borderColorFocus: string;
    sameColor: string;
    inputColor: string;
    inputFocusColor: string;
  }
}
