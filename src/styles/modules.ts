import { colors } from './constants';
import { dragging } from './mixins';

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
    background-color: ${chk ? colors.lightGreen : colors.blue};
    transition: background-color 200ms ease-in-out;

    &:not(:disabled):hover {
      background-color: ${chk ? colors.lightGreenBlur : colors.blueLight};
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
export const selectStyle = {
  select: (top: number) => `
    top: ${top}px;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-height: 300px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow-y: auto;
  `,
  
  option: () => `
    ${dragging.stop()}
    width: 100%;
    padding: 10px 16px;
    &:hover {
      opacity: .6;
    }
  `,
}