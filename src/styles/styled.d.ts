// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    bgColorSub: string;
    textColor: string;
    borderColor: string;
    sameColor: string;
  }
}
