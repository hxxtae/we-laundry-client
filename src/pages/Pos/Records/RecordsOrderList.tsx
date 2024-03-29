import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { colors, dragging, includes, line, media, scroll } from '../../../styles';
import { recordLaundryState, recordRepairState } from '../../../global';

interface IRecordsOrderList {
  clickItems: string[];
  onClickItem: (id: string) => void;
}

function RecordsOrderList({ clickItems, onClickItem }: IRecordsOrderList) {
  const laundry = useRecoilValue(recordLaundryState);
  const repair = useRecoilValue(recordRepairState);

  return (
    <OrderList>
      {laundry.map((obj) => (
        <OrderItem
          key={obj.productId}
          chk={clickItems.includes(obj.productId)}
          onClick={() => onClickItem(obj.productId)}>
          <Item>{obj.productName}</Item>
          <Item>{obj.count}</Item>
          <Item>{`${obj.price.toLocaleString()}원`}</Item>
        </OrderItem>
      ))}
      {!!repair.length && <ItemDivision>{'수선'}</ItemDivision>}
      {repair.map((obj) => (
        <OrderItem
          key={obj.repairId}
          chk={clickItems.includes(obj.repairId)}
          onClick={() => onClickItem(obj.repairId)}>
          <Item>{obj.repairName}</Item>
          <Item>{obj.count}</Item>
          <Item>{`${obj.price.toLocaleString()}원`}</Item>
        </OrderItem>
      ))}
    </OrderList>
  )
}

export default RecordsOrderList;

const OrderList = styled.ul`
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  ${(props) => scroll.custom(5, props.theme.borderColorSub, props.theme.textColor)}
  ${dragging.stop}
  width: 100%;
  height: 356px;
  margin-top: auto;
  overflow-y: auto;
  overflow-x: hidden;

  @media ${media.pc_s} {
    height: 449px;
  }
`;

const OrderItem = styled.li<{chk: boolean}>`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
  height: 45px;
  padding: 10px 17px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props => props.chk ? props.theme.borderColor : 'none')};
  font-weight: ${(props) => props.chk ? '600' : '400'};
  font-size: 14px;
  flex-shrink: 0;
  cursor: pointer;

  @media ${media.pc_s} {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

const Item = styled.span`
  &:first-child {
    margin-right: auto;
    ${line.line_clamp(1)}
  }
  &:nth-of-type(2) {
    color: ${colors.blue};
    padding: 0 1px;
  }
  &:last-child {
    min-width: 80px;
    ${includes.flexBox('center', 'flex-end')}
  }
`;

const ItemDivision = styled.p`
  width: 100%;
  color: ${(props) => props.theme.textColor};
  padding: 5px 12px;
  background-color: ${(props) => props.theme.inputColor};
  font-weight: 600;
`;


