import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styled from 'styled-components';

import DateComponent, { dateToString } from '../../../../components/DateComponent';
import { buttonStyle, includes } from '../../../../styles';
import { InputTitles } from '../../../../components';

interface IHistoryDateSearch {
  setDateActive: React.Dispatch<React.SetStateAction<boolean>>;
  setNowDate: React.Dispatch<React.SetStateAction<string>>;
  setCusObj: React.Dispatch<React.SetStateAction<{ addname: string, dong: string, ho: string }>>;
  prevInput: string;
}

function HistoryDateSearch({ setDateActive, setNowDate, setCusObj, prevInput }: IHistoryDateSearch) {
  const searchInput = !prevInput ? new Date() : new Date(prevInput);
  const [searchDate, setSearchDate] = useState(searchInput);

  const onSearch = () => {
    setNowDate(dateToString(searchDate));
    setCusObj((prev) => ({
      ...prev,
      addname: '',
      dong: '',
      ho: ''
    }));
    setDateActive(false);
  }

  return (
    <Wrapper>
      <InputGroup>
        <Close type='button' onClick={() => setDateActive(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </Close>
        <InputTitles title='날짜 선택' des='원하는 날짜를 선택해주세요.' />
        <DateComponent thisDate={searchDate} setThisDate={setSearchDate} />
        <ButtonGroup>
          <Submit type='button' onClick={onSearch}>{'조회'}</Submit>
        </ButtonGroup>
      </InputGroup>
    </Wrapper>
  )
}

export default HistoryDateSearch;

const Wrapper = styled.div`
  ${includes.flexBox()}
  position: relative;
  width: 320px;
  height: 320px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
`;

const InputGroup = styled.form`
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 220px;
`;

const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  ${includes.flexBox()}
  ${buttonStyle.base}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};

  &:hover,
  &:active {
    opacity: .6;
  }
`;

const ButtonGroup = styled.div`
  ${includes.flexBox()}
  width: 100%;
`;

const Submit = styled.button`
  ${buttonStyle.primary}
  margin-top: 50px;
  width: 100px;
`;

