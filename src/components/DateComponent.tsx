import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';

import { colors, includes, inputStyle, media } from '../styles';
import { useState } from 'react';

interface IRenderDateHeader {
  // Ref: renderCustomHeader property in interfaece of ReactDatePickerProps
  date: Date;
  changeYear(year: number): void;
  changeMonth(month: number): void;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  decreaseYear(): void;
  increaseYear(): void;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
}

interface IDateComponent {
  thisDate: string;
  setThisDate: React.Dispatch<React.SetStateAction<string>>;
}

export const dateToString = (date: Date) => {
  return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}

function DateComponent({ thisDate, setThisDate }: IDateComponent) {
  const [months] = useState([
    "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
  ]);

  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }: IRenderDateHeader) => (
    <CalendarHeader>
      <button type='button' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <p>{date.getFullYear()}년 {months[date.getMonth()]}</p>
      <button type='button' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </CalendarHeader>
  )

  return (
    <Wrapper>
      <ReactDatePicker
        locale={ko}
        className='datePickerInput'
        dateFormat="yyyy-MM-dd"
        autoFocus
        selected={new Date(thisDate)}
        onChange={(date: Date) => setThisDate(dateToString(date))}
        maxDate={new Date()}
        todayButton={"Today"}
        popperModifiers={{ // 화면을 벗어나지 않도록 하는 설정
          preventOverflow: { enabled: true }
        }}
        disabledKeyboardNavigation // 다른 월의 같은 날짜 자동 seleted 되는 현상 방지
        showPopperArrow={false}
        renderCustomHeader={renderCustomHeader}
      />
    </Wrapper>
  )
}

export default DateComponent;

const Wrapper = styled.div`

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
      left: 275px !important;
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

const CalendarHeader = styled.div`
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