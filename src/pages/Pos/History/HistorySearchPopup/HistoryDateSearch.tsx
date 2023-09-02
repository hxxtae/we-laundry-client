import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styled from 'styled-components';

import { dateToString } from '../../../../util';
import { buttonStyle, includes, media } from '../../../../styles';
import { InputTitles, DateComponent, DateKind } from '../../../../components';
import { IRecordSearchRequest } from '../../../../services/records';

interface IHistoryDateSearch {
  setDateActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchObj: React.Dispatch<React.SetStateAction<IRecordSearchRequest>>;
  searchObj: IRecordSearchRequest;
}

function HistoryDateSearch({ setDateActive, setSearchObj, searchObj }: IHistoryDateSearch) {
  const [searchDate, setSearchDate] = useState(dateToString(searchObj.recordDate));
  const [searchKind, setSearchKind] = useState(searchObj.recordDateKind);
  const [searchKindAct, setSearchKindAct] = useState(false);

  const onSearch = () => {
    setSearchObj(prev => ({
      ...prev,
      recordDate: searchDate,
      recordDateKind: searchKind,
      addname: '',
      dong: '',
      ho: ''
    }));
    setDateActive(false);
  };

  const onClickSelect = () => {
    setSearchKindAct((prev) => !prev);
  }

  const onChangeSelect = (kind: string) => {
    setSearchKind(kind);
    setSearchKindAct(false);
  }

  return (
    <Wrapper>
      <InputGroup>
        <Close type='button' onClick={() => setDateActive(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </Close>
        <InputTitles title='날짜 선택' des='원하는 날짜를 선택해주세요.' />
        <InputBox>
          <DateComponent thisDate={searchDate} setThisDate={setSearchDate} />
          <DateKind
            selectKindAct={searchKindAct}
            selectKind={searchKind}
            onChangeSelect={onChangeSelect}
            onClickSelect={onClickSelect}
          />
        </InputBox>
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
  top: -40px;
  left: -120px;
  width: 285px;
  height: 285px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};

  @media ${media.pc_s} {
    left: -140px;
    width: 320px;
    height: 320px;
  }
`;

const InputGroup = styled.form`
  ${includes.flexBox('stretch', 'center')}
  flex-direction: column;
  margin: 0 20px;
`;

const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  ${includes.flexBox()}
  ${buttonStyle.base()}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};

  &:hover,
  &:active {
    opacity: .6;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  align-self: center;
`;

const Submit = styled.button`
  ${buttonStyle.primary()}
  margin-top: 50px;
  width: 100px;
`;

