import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IRecordObjResponse } from '../../../services/records';
import { colors, includes, media } from '../../../styles';
import { recordRequestState } from '../../../global';

interface IHistoryListItem {
  recordObjs: IRecordObjResponse[];
  recordObjRecordDate: string;
  recordObjIndex: number;
  onClickId: (itemId: string) => void;
  clickId: string;
}

function HistoryListItem({ recordObjs, recordObjRecordDate, recordObjIndex, onClickId, clickId }: IHistoryListItem) {
  const setRecordState = useSetRecoilState(recordRequestState);

  const itemDay = (strDate: string) => {
    // NOTE: IOS에서는 날짜를 렌더링 하는 방식이 다르다. -> "/" 로 날짜를 구분해 주면 된다. ex) 2022. 5. 5. -> 2022/5/5
    const dateFormat = strDate.trim().replace(/[\.\s]+/g, '/').slice(0, -1);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const day = new Date(dateFormat).getDay();
    return days[day];
  }

  const remainCnt = (count: number) => {
    return count === 1 ? '' : `외 ${count - 1}건`;
  }

  const onClickItem = (recordObj: IRecordObjResponse) => {
    const { id, recordDate, recordCount, recordPrice, cusid, addid, addname, addfullname, dong, ho, records } = recordObj;
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
    onClickId(id);
  }

  return (
    <ItemBox>
      <DateItem>
        <span>{new Date(recordObjRecordDate).toLocaleDateString()}</span>
        <span>{`(${itemDay(recordObjRecordDate)})`}</span>
      </DateItem>
      {recordObjs.slice(recordObjIndex).map((obj) => (
        recordObjRecordDate === obj.recordDate && (
          <AnyItem key={obj.id} onClick={() => onClickItem(obj)} select={clickId === obj.id}>
            <TopGroup>
              <span>{obj.addname}</span>
              <span>{obj.dong}</span>
              <span>{obj.ho}</span>
            </TopGroup>
            <BottomGroup>
              <span>{`${obj.recordPrice.toLocaleString()}원`}</span>
              <span>{`${obj.records.laundry[0].productName} ${remainCnt(obj.recordCount)}`}</span>
            </BottomGroup>
            {!!obj.records.repair.length && 
              <RepairChk>
                {'수선'}
              </RepairChk> }
          </AnyItem>
      )))}
    </ItemBox>
  )
}

export default HistoryListItem;

const ItemBox = styled.li`
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 100%;
  color: ${(props) => props.theme.textColor};
`;

const DateItem = styled.div`
  position: sticky;
  top: 0;
  ${includes.flexBox('center', 'flex-start')}
  padding: 10px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  background-color: ${(props) => props.theme.inputColor};
  z-index: 1;

  span:last-child {
    margin-left: 5px;
  }

  @media ${media.pc_s} {
    font-size: 16px;
    padding: 12px 10px;
  }
`;

const AnyItem = styled.div<{select: boolean}>`
  position: relative;
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.select ? props.theme.sameColor : 'none'};
  cursor: pointer;

  @media ${media.pc_s} {
    &:hover {
      background-color: ${(props) => props.theme.borderColor};
    }
  }
`;

const TopGroup = styled.div`
  ${includes.flexBox('center', 'flex-start')}
  padding-bottom: 6px;

  span {
    margin-right: 20px;
    font-size: 14px;
    font-weight: 600;

    &:first-child {
      padding: 7px;
      border: 1px solid ${(props) => props.theme.borderColor};
      border-radius: 4px;
      background-color: ${(props) => props.theme.bgColorSub};
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @media ${media.pc_s} {
    span {
      font-size: 15px;
    }
  }
`;

const BottomGroup = styled.div`
  ${includes.flexBox('center', 'flex-start')}

  span {
    font-size: 14px;

    &:first-child {
      margin-right: 16px;
      padding: 0 7px;
      font-size: 16px;
      font-weight: 600;
      color: ${colors.blue};
    }
  }

  @media ${media.pc_s} {
    span {
      font-size: 15px;

      &:first-child {
        font-size: 18px;
      }
    }
  }
`;

const RepairChk = styled.p`
  ${includes.flexBox()}
  position: absolute;
  top: 15px;
  right: 10px;
  width: 40px;
  height: 20px;
  border-radius: 4px;
  background-color: ${colors.green};
  font-weight: 600;
  color: ${colors.white};
`;