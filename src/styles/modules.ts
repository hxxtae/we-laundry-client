import { colors } from './constants';
import { media } from './mixins';

/*  
--------------------------------
  Input Style
--------------------------------
*/
export const inputStyle = {
  base: () => `
    display: block;
    width: 100%;
    height: 40px;
    padding: 0 16px;
    background-color: ${colors.backgroundLight};
    border: 1px solid ${colors.borderLight};
    border-radius: 4px;
    appearance: none;
    transition: background-color border-color 200ms ease-in-out;
    font-weight: 400;
    font-size: 16px;

    &::placeholder {
      font-size: 14px;
    }

    &:focus {
      border-color: ${colors.secondary};
    }
  `,
}
/*  
--------------------------------
  Button Style
--------------------------------
*/
export const buttonStyle = {
  base: (chk: boolean = false) => `
    padding: 8px;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `,

  primary: (chk: boolean = false) => `
    ${buttonStyle.base()}
    color: white;
    background-color: ${chk ? colors.green : colors.blue};
    transition: background-color 200ms ease-in-out;

    &:not(:disabled):hover {
      background-color: ${chk ? colors.greenBlur : colors.blueLight};
    }
  `,

  secondary: () => `
    ${buttonStyle.base()}
    color: ${colors.primary};
    background-color: ${colors.borderLight};
    transition: background-color 200ms ease-in-out;

    &:not(:disabled):hover {
      background-color: ${colors.tertiary};
    }
  `,

  outline: () => `
    ${buttonStyle.base()}
    color: ${colors.blue};
    background-color: white;
    border: 1px solid ${colors.blue};
    transition: background-color 200ms ease-in-out;

    &:not(:disabled):hover {
      background-color: ${colors.blueGray};
    }
  `,

  open: () => `
    ${buttonStyle.base()}
    color: white;
    background-color: ${colors.green};
    transition: background-color 200ms ease-in-out;

    &:not(:disabled):hover {
      background-color: ${colors.greenBlur};
    }
  `,

  close: () => `
    ${buttonStyle.base()}
    color: white;
    background-color: ${colors.red};
    transition: background-color 200ms ease-in-out;

    &:not(:disabled):hover {
      background-color: ${colors.redDark};
    }
  `,
}
/*  
--------------------------------
  Select Style
--------------------------------
*/
