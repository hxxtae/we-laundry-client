import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { colors, includes, media, scroll } from '../../../styles';
import { recordRequestState } from '../../../global';

function HistoryDetailList() {
  const recordState = useRecoilValue(recordRequestState);

  return (
    <ReceiptList>
      {recordState.laundry.map((item) => (
        <ReceiptItem key={item.productId}>
          <span>{item.productName}</span>
          <span>{item.count}</span>
          <span>{`${item.price.toLocaleString()}원`}</span>
        </ReceiptItem>
      ))}
      {!!recordState.repair.length && 
        <ReceiptItem>
          <strong>{'수선'}</strong>
        </ReceiptItem>}
      {recordState.repair.map((item) => (
        <ReceiptItem key={item.repairId}>
          <span>{item.repairName}</span>
          <span>{item.count}</span>
          <span>{`${item.price.toLocaleString()}원`}</span>
        </ReceiptItem>
      ))}
    </ReceiptList>
  )
}

export default HistoryDetailList;

const ReceiptList = styled.ul`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  height: 192px;
  overflow-y: auto;
  overflow-x: hidden;
  ${(props) => scroll.custom(5, props.theme.borderColorSub, props.theme.textColor)}

  @media ${media.pc_s} {
    height: 276px;
    ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
  }

  @media ${media.pc_l} {
    height: 302px;
  }
`;

const ReceiptItem = styled.li`
  ${includes.flexBox('center', 'space-between')}
  width: 70%;
  padding-top: 12px;

  span {
    font-size: 14px;

    &:first-child {
      margin-right: 10px;
    }

    &:nth-child(2) {
      color: ${colors.blue};
    }

    &:last-child {
      font-size: 16px;
      font-weight: 600;
      margin-left: auto;
    }
  }

  strong {
    padding: 3px 8px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.textColor};
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.textColor};
  }

  @media ${media.pc_s} {
    span {
      font-size: 15px;

      &:last-child {
        font-size: 18px;
      }
    }
  }
`;
