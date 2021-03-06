import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { buttonStyle, dragging, includes, media, scroll } from '../../../styles';
import { useHistoryCustomerFetch, useHistoryDateFetch } from '../../../hooks';
import { LoadingComponent, Overlay } from '../../../components';
import { dateToString } from '../../../components/DateComponent';
import { IRecordObjResponse } from '../../../services/records';
import { recordRequestState } from '../../../global';
import HistoryListItem from './HistoryListItem';
import HistoryDateSearch from './HistorySearchPopup/HistoryDateSearch';
import HistoryCustomerSearch from './HistorySearchPopup/HistoryCustomerSearch';

function HistoryList() {
  const [nowDate, setNowDate] = useState(dateToString(new Date()));
  const [cusObj, setCusObj] = useState({ addname: '', dong: '', ho: '' });
  const [dateActive, setDateActive] = useState(false);
  const [customerActive, setCustomerActive] = useState(false);
  const [clickId, setClickId] = useState('');
  const setRecordState = useSetRecoilState(recordRequestState);
  const resetRecordState = useResetRecoilState(recordRequestState);
  const { loadingDate, reLoadingDate, hisDateDatas } = useHistoryDateFetch(nowDate);
  const { loadingCus, reLoadingCus, hisDatas } = useHistoryCustomerFetch(cusObj);
  const searchLoading = loadingDate || reLoadingDate || loadingCus || reLoadingCus;

  const searchDatas = (dateState: string): IRecordObjResponse[] => {
    if (!dateState) {
      return hisDatas;
    }
    return hisDateDatas;
  }

  const findIdx = (datas: IRecordObjResponse[], value: string) => {
    return datas.findIndex((obj) => obj.recordDate === value);
  }

  useEffect(() => {
    if (searchLoading) {
      return;
    }

    if (!hisDateDatas?.length && !hisDatas?.length) {
      resetRecordState();
      return;
    }

    const { id, recordDate, recordCount, recordPrice, cusid, addid, addname, addfullname, dong, ho, records } = searchDatas(nowDate)[0];
    setRecordState((prevObj) => ({
      ...prevObj,
      id,
      recordDate,
      recordCount,
      recordPrice,
      cusid,
      addid,
      addname,
      addfullname,
      dong,
      ho,
      laundry: records.laundry,
      repair: records.repair,
    }));
  }, [hisDateDatas, hisDatas]);

  const onClickItem = useCallback((itemId: string) => {
    setClickId(itemId);
  }, [clickId]);

  return (
    <>
      <Wrapper>
        <ButtonGroup>
          <DateButton onClick={() => setDateActive(true)}>{'????????? ??????'}</DateButton>
          <CusButton onClick={() => setCustomerActive(true)}>{'????????? ??????'}</CusButton>
        </ButtonGroup>
        <List>
          {!!(searchDatas(nowDate)?.length) ?
            searchDatas(nowDate)?.map((obj, index, arr) => (
              findIdx(arr, obj.recordDate) === index && (
                <HistoryListItem
                  key={obj.id}
                  recordObjs={arr}
                  recordObjRecordDate={obj.recordDate}
                  recordObjIndex={index}
                  onClickId={onClickItem}
                  clickId={clickId} />
              ))) : 
            <NotFound>
              <FontAwesomeIcon icon={faClipboard} />
              <span>{'(?????? ?????? ??????)'}</span>
            </NotFound>
            }
        </List>
      </Wrapper>

      {searchLoading && 
        <Overlay>
          <LoadingComponent loadingMessage='????????? ??????????????????.' />
        </Overlay>}
      {dateActive && 
        <Overlay>
          <HistoryDateSearch
            setDateActive={setDateActive}
            setNowDate={setNowDate}
            setCusObj={setCusObj}
            prevInput={nowDate} />
        </Overlay>}
      {customerActive && 
        <Overlay>
          <HistoryCustomerSearch
            setCustomerActive={setCustomerActive}
            setNowDate={setNowDate}
            setCusObj={setCusObj}
            prevInput={cusObj} />
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
  ${buttonStyle.primary}
  flex-grow: 1;
  margin-right: 4px;
`;

const CusButton = styled.button`
  ${buttonStyle.primary}
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
