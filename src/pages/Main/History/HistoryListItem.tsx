import styled from 'styled-components';

import { IRecordObjResponse } from '../../../services/records';
import { colors, includes, media } from '../../../styles';

interface IHistoryListItem {
  recordObjs: IRecordObjResponse[]; 
  recordObjRecordDate: string;
  recordObjIndex: number;
}

function HistoryListItem({ recordObjs, recordObjRecordDate, recordObjIndex }: IHistoryListItem) {

  const remainCnt = (count: number) => {
    return count === 1 ? '' : `외 ${count - 1}건`;
  }

  return (
    <ItemBox>
      <DateItem>{recordObjRecordDate}</DateItem>
      {recordObjs.slice(recordObjIndex).map((obj) => (
        recordObjRecordDate === obj.recordDate && (
          <AnyItem key={obj.id}>
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

const DateItem = styled.h2`
  position: sticky;
  top: 0;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  background-color: ${(props) => props.theme.inputColor};
  z-index: 1;

  @media ${media.pc_s} {
    font-size: 16px;
    padding: 12px 10px;
  }
`;

const AnyItem = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
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