import { useState } from 'react';
import styled from 'styled-components';
import { useHistoryDateFetch } from '../../../hooks';
import { IRecordObjResponse } from '../../../services/records';
import { buttonStyle, colors, dragging, includes, media, scroll } from '../../../styles';

function HistoryList() {
  const [nowDate, setNowDate] = useState(new Date().toLocaleDateString('ko-KR'));
  const { loadingDate, hisDateDatas } = useHistoryDateFetch(nowDate);

  const includeIdx = (datas: IRecordObjResponse[], value: string) => {
    return datas.map(obj => obj.recordDate).indexOf(value);
  }

  const remainCnt = (count: number) => {
    return count === 1 ? '' : `외 ${count - 1}건`;
  }

  return (
    <Wrapper>
      <ButtonGroup>
        <DateButton>{'날짜로 검색'}</DateButton>
        <CusButton>{'주소로 검색'}</CusButton>
      </ButtonGroup>
      <List>
        {
          hisDateDatas?.map((obj, index, arr) => (
            <>
              {includeIdx(arr, obj.recordDate) === index && (
                <ItemBox>
                  <DateItem>{obj.recordDate}</DateItem>
                  {arr.map((inObj) => (
                    <>
                      {obj.recordDate === inObj.recordDate && (
                        <AnyItem>
                          <TopGroup>
                            <span>{inObj.addname}</span>
                            <span>{inObj.dong}</span>
                            <span>{inObj.ho}</span>
                          </TopGroup>
                          <BottomGroup>
                            <span>{`${inObj.recordPrice.toLocaleString()}원`}</span>
                            <span>{`${inObj.records.laundry[0].productName} ${remainCnt(inObj.recordCount)}`}</span>
                          </BottomGroup>
                        </AnyItem>
                      )}
                    </>
                  ))}
                </ItemBox>
              )}
            </>
          ))
        }
      </List>
    </Wrapper>
  )
}

export default HistoryList;

const Wrapper = styled.section`
  width: 320px;
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
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  height: 420px;
  border-left: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}

  @media ${media.pc_s} {
    height: 540px;
  }

  @media ${media.pc_l} {
    height: 650px;
  }
`;

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

  @media ${media.pc_s} {
    font-size: 16px;
    padding: 12px 10px;
  }
`;

const AnyItem = styled.div`
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



