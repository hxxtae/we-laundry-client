import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { recordLaundryState, recordRepairState, recordRequestState } from '../../../global';
import { buttonStyle, colors, dragging, includes, media } from '../../../styles';
import { useAddNDelOfRecord, useAllDelOfRecord } from '../../../hooks';
import { Overlay } from '../../../components';
import RecordsOrderList from './RecordsOrderList';
import RecordsRepairPopup from './RecordPopups/RecordsRepairPopup';
import RecordsReceiptPopup from './RecordPopups/RecordsReceiptPopup';

function RecordsOrder() {
  const [laundry, setLaundry] = useRecoilState(recordLaundryState);
  const [repair, setRepair] = useRecoilState(recordRepairState);
  const [recordState, setRecordState] = useRecoilState(recordRequestState);
  const [clickItems, setClickItems] = useState<string[]>([]);
  const [totalPay, setTotalPay] = useState({ price: 0, count: 0 });
  const [repairAct, setRepairAct] = useState(false);
  const [receiptAct, setReceiptAct] = useState(false);

  const onClickItem = (itemId: string) => {
    setClickItems((prevItems) => {
      const copyItems = [...prevItems];
      const index = copyItems.indexOf(itemId);
      if (index !== -1) {
        copyItems.splice(index, 1);
      } else {
        copyItems.push(itemId);
      }
      return copyItems;
    });
  }

  const onAddNDelLaundry = useAddNDelOfRecord(setLaundry, clickItems, setClickItems);
  const onAddNDelRepair = useAddNDelOfRecord(setRepair, clickItems, setClickItems);
  const onAllRemoveLaundry = useAllDelOfRecord(setLaundry, clickItems, setClickItems);
  const onAllRemoveRepair = useAllDelOfRecord(setRepair, clickItems, setClickItems);

  const onAddItemClick = () => {
    onAddNDelLaundry('add');
    onAddNDelRepair('add');
  }

  const onDelItemClick = () => {
    onAddNDelLaundry('del');
    onAddNDelRepair('del');
  }

  const onAllRemoveItemClick = () => {
    onAllRemoveLaundry();
    onAllRemoveRepair();
  }

  const onPayment = () => {
    setRecordState((prevRecordState) => {
      return {
        ...prevRecordState,
        recordCount: totalPay.count,
        recordPrice: totalPay.price,
        recordSalePrice: totalPay.price,
        laundry,
        repair,
      }
    })
    setReceiptAct(true);
  }

  useEffect(() => {
    setTotalPay(() => {
      const recordArray = [...laundry, ...repair];
      const payObj = recordArray.reduce((prev, curr) => ({
        count: (prev.count + curr.count),
        price: (prev.price + curr.price),
      }), {price: 0, count: 0});

      return {
        price: payObj.price,
        count: payObj.count,
      };
    });
  }, [laundry, repair]);

  return (
    <>
      <Wrapper>
        <Top>
          <Title>{'목록'}</Title>
          <AllRemove onClick={onAllRemoveItemClick}>
            <FontAwesomeIcon icon={faTrashCan} />
            {!!clickItems.length && 
              <RemoveCount>{clickItems.length}</RemoveCount>}
          </AllRemove>
        </Top>
        <ControlGroup>
          <Del onClick={onDelItemClick}>
            <FontAwesomeIcon icon={faMinus} />
          </Del>
          <Add onClick={onAddItemClick}>
            <FontAwesomeIcon icon={faPlus} />
          </Add>
        </ControlGroup>

        <RecordsOrderList
          clickItems={clickItems}
          onClickItem={onClickItem} />

        <Bottom>
          <PaymentButton
            onClick={onPayment}
            disabled={!totalPay.count || !recordState.cusid}>
            {`${totalPay.count}건 접수 ${totalPay.price.toLocaleString()}원`}
          </PaymentButton>
          <AddRepair onClick={() => setRepairAct(true)}>
            <FontAwesomeIcon icon={faPlus} />
            {'수선'}
          </AddRepair>
        </Bottom>
      </Wrapper>

      {repairAct && 
        <Overlay>
          <RecordsRepairPopup setPopupActive={setRepairAct} />
        </Overlay>}
      {receiptAct && 
        <RecordsReceiptPopup
          totalPay={totalPay}
          setReceiptAct={setReceiptAct}
          setClickItems={setClickItems} />}
    </>
  )
}

export default RecordsOrder;

const Wrapper = styled.section`
  ${dragging.stop}
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 0;
  margin-left: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
  overflow: hidden;

  @media ${media.pc_l} {
    width: 315px;
  }
`;

const Top = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
  margin-bottom: 6px;
  padding: 0 15px;

  @media ${media.pc_s} {
    padding: 0 20px;
    margin-bottom: 10px;
  }
`;

const Title = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;
`;

const AllRemove = styled.button`
  position: relative;
  ${includes.flexBox()}
  width: 30px;
  height: 30px;
  border-radius: 4px;
  color: ${(props) => props.theme.textColor};
  transition: background-color 200ms ease-in-out;
  cursor: pointer;

  &:active,
  &:hover {
    opacity: .6;
    background-color: ${(props) => props.theme.borderColor};
  }
`;

const RemoveCount = styled.p`
  position: absolute;
  left: 14px;
  bottom: -2px;
  ${includes.flexBox()}
  min-width: 15px;
  min-height: 15px;
  padding: 0 5px;
  background-color: ${colors.red};
  color: ${colors.white};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;

  @media ${media.pc_s} {
    font-size: 8px;
  }
`;

const ControlGroup = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
  padding: 0 15px;

  @media ${media.pc_s} {
    padding: 0 20px;
  }
`;

const Del = styled.button`
  ${buttonStyle.outline}
  flex-grow: 1;
  margin-right: 5px;
  height: 40px;
`;

const Add = styled.button`
  ${buttonStyle.outline}
  flex-grow: 1;
  height: 40px;
`;

const Bottom = styled.div`
  ${includes.flexBox()}
  width: 100%;
`;

const PaymentButton = styled.button`
  ${buttonStyle.primary()}
  height: 60px;
  flex-grow: 1;
  border-radius: 0px;
  margin-left: 0; // (tablet style) 이 미세하게 틀어짐 막음
  margin-right: 0; // (tablet style) 이 미세하게 틀어짐 막음
  font-size: 16px;
  font-weight: 600;

  @media ${media.pc_s} {
    font-size: 18px;
  }
`;

const AddRepair = styled.button`
  ${buttonStyle.outline}
  width: 70px;
  height: 60px;
  border-radius: 0px;
  border-bottom-right-radius: 4px;
  line-height: 1px;

  @media ${media.pc_s} {
    width: 100px;
  }
`;
