// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    bgColorSub: string;
    bgColorThi: string;
    textColor: string;
    borderColor: string;
    sameColor: string;
    inputColor: string;
    inputFocusColor: string;
  }
}
