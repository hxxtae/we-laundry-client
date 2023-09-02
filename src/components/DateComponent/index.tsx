import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';

import { dateToString } from '../../util';
import * as S from './style';

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

function DateComponent({ thisDate, setThisDate }: IDateComponent) {
  const [months] = useState([
    "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
  ]);

  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }: IRenderDateHeader) => (
    <S.CalendarHeader>
      <button type='button' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <p>{date.getFullYear()}년 {months[date.getMonth()]}</p>
      <button type='button' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </S.CalendarHeader>
  )

  return (
    <S.Wrapper>
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
    </S.Wrapper>
  )
}

export default DateComponent;

