import { colors } from './constants';

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
  base: () => `
    padding: 8px;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `,

  primary: () => `
    ${buttonStyle.base()}
    color: white;
    background-color: ${colors.blue};
    transition: background-color 200ms ease-in-out;

    &:not(:disabled):hover {
      background-color: ${colors.blueDark};
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
      background-color: ${colors.blueLight};
    }
  `,
}
/*  
--------------------------------
  Select Style
--------------------------------
*/
