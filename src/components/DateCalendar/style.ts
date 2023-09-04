import styled from 'styled-components';

import { colors, includes, inputStyle, media } from '../../styles';

export const Wrapper = styled.div`
  .datePickerInput {
    ${inputStyle.base}
    text-align: center;
    background-color: ${(props) => props.theme.inputColor};
    border-color: ${(props) => props.theme.borderColor };
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
  }

  .react-datepicker-popper {
    top: -152px !important; 
    left: 250px !important;

    @media ${media.pc_s} {
      top: -172px !important; 
      left: 282px !important;
    }
  }

  .react-datepicker {
    border-color: ${(props) => props.theme.borderColor};
    border-radius: 4px;
    overflow: hidden;
  }

  .react-datepicker__month-container {
    padding: 10px;
    background-color: ${(props) => props.theme.inputColor};
  }

  .react-datepicker__header {
    background-color: transparent;
    border-color: transparent;
    padding: 0 5px;
  }

  .react-datepicker__day-names {
    div {
      margin: 0 7px;
      color: ${(props) => props.theme.textColor};
      font-size: 12px;
    }

    .react-datepicker__day-name {
      &:first-child {
        color: ${colors.red};
      }

      &:last-child {
        color: ${colors.blue};
      }
    }
  }

  .react-datepicker__week {
    div {
      margin: 1px;
      font-size: 12px;
      line-height: 34px;
      width: 32.5px;
      height: 32.5px;
    }

    div:not(.react-datepicker__day--disabled, .react-datepicker__day--selected) {
      color: ${(props) => props.theme.textColor};
      &:hover {
        background-color: ${(props) => props.theme.borderColor};
      }
    }

    .react-datepicker__day--disabled {
      color: ${(props) => props.theme.borderColor};
    }
  }

  .react-datepicker__today-button {
    height: 30px;
    font-size: 14px;
    line-height: 16px;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.borderColor};
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

export const CalendarHeader = styled.div`
  ${includes.flexBox('center', 'space-between')}
  padding: 20px 0px;
  color: ${(props) => props.theme.textColor};

  button {
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;

  &:hover,
  &:active {
    opacity: .6;
    background-color: ${(props) => props.theme.borderColor};
  }
  }

  p {
    font-size: 14px;
    margin: 0 10px;
  }
`;