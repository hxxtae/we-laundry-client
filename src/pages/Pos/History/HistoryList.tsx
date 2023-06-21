import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { buttonStyle, dragging, includes, media, scroll } from '../../../styles';
import { useHistoryFetch } from '../../../hooks';
import { LoadingComponent, Overlay } from '../../../components';
import { dateToString } from '../../../components/DateComponent';
import { IRecordObjResponse, IRecordSearchRequest } from '../../../services/records';
import HistoryListItem from './HistoryListItem';
import HistoryDateSearch from './HistorySearchPopup/HistoryDateSearch';
import HistoryCustomerSearch from './HistorySearchPopup/HistoryCustomerSearch';

function HistoryList() {
  const [searchObj, setSearchObj] = useState<IRecordSearchRequest>({
    recordDate: dateToString(),
    recordDateKind: '1m',
    addname: '',
    dong: '',
    ho: '',
  });
  const [dateActive, setDateActive] = useState(false);
  const [customerActive, setCustomerActive] = useState(false);
  const [clickId, setClickId] = useState('');
  const { historyLoading, reHistoryLoading, historyDatas } = useHistoryFetch(searchObj);
  const searchLoading = historyLoading || reHistoryLoading;

  const onHistoryDatas = (datas: IRecordObjResponse[]) => {
    const historyMap = new Map();
    historyMap.set(dateToString(datas[0].recordDate), []);
    for (const history of datas) {
      const key = dateToString(history.recordDate);
      if (historyMap.get(key)) {
        historyMap.get(key).push(history);
        continue;
      }
      historyMap.set(key, [history]);
    }
    return [...historyMap];
  }

  const onClickItem = useCallback((itemId: string) => {
    setClickId(itemId);
  }, []);

  return (
    <>
      <Wrapper>
        <ButtonGroup>
          <DateButton onClick={() => setDateActive(true)}>{'날짜로 검색'}</DateButton>
          <CusButton onClick={() => setCustomerActive(true)}>{'주소로 검색'}</CusButton>
        </ButtonGroup>
        <List>
          {
            !!(historyDatas?.length) ? 
              onHistoryDatas(historyDatas).map(([date, historyArr]) => (
                <HistoryListItem
                  key={date}
                  recordObjs={historyArr}
                  recordObjRecordDate={date}
                  onClickId={onClickItem}
                  clickId={clickId}
                />
              )) : 
              <NotFound>
                <FontAwesomeIcon icon={faClipboard} />
                <span>{'(주문 내역 없음)'}</span>
              </NotFound>
          }
        </List>
      </Wrapper>

      {searchLoading && 
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
        </Overlay>}
      {dateActive && 
        <Overlay>
          <HistoryDateSearch
            setDateActive={setDateActive}
            setSearchObj={setSearchObj}
            searchObj={searchObj} />
        </Overlay>}
      {customerActive && 
        <Overlay>
          <HistoryCustomerSearch
            setCustomerActive={setCustomerActive}
            setSearchObj={setSearchObj}
            searchObj={searchObj} />
        </Overlay>}
    </>
  )
}

export default HistoryList;

const Wrapper = styled.section`
  width: 320px;
  flex-shrink: 0;
  ${dragging.stop}

  @media ${media.pc_s} {
    width: 360px;
  }
`;

const ButtonGroup = styled.div`
  ${includes.flexBox()}
`;

const DateButton = styled.button`
  ${buttonStyle.primary()}
  flex-grow: 1;
  margin-right: 4px;
`;

const CusButton = styled.button`
  ${buttonStyle.primary()}
  flex-grow: 1;
`;

const List = styled.ul`
  position: relative;
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  height: 420px;
  border-left: 1px solid ${(props) => props.theme.borderColor};
  border-right: 1px solid ${(props) => props.theme.borderColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
  z-index: 1;

  @media ${media.pc_s} {
    height: 540px;
  }

  @media ${media.pc_l} {
    height: 650px;
  }
`;

const NotFound = styled.div`
  position: absolute;
  ${includes.flexBox()}
  flex-direction: column;
  height: 100%;
  color: ${(props) => props.theme.textColor};
  opacity: .3;
  
  svg {
    font-size: 30px;
  }

  span {
    padding: 15px 0;
    font-size: 14px;
  }

  @media ${media.pc_s} {
    span {
      font-size: 16px;
    }
  }
`;
