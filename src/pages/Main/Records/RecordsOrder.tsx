import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Overlay } from '../../../components';
import { recordLaundryState, recordRepairState, recordRequestState } from '../../../global';
import { buttonStyle, colors, includes, media } from '../../../styles';
import RecordsRepairPopup from './RecordPopups/RecordsRepairPopup';
import RecordsOrderList from './RecordsOrderList';
import RecordsReceiptPopup from './RecordPopups/RecordsReceiptPopup';

function RecordsOrder() {
  console.log("order");
  const setLaundry = useSetRecoilState(recordLaundryState);
  const setRepair = useSetRecoilState(recordRepairState);
  const recordState = useRecoilValue(recordRequestState);
  const [clickItems, setClickItems] = useState<string[]>([]);
  const [totalPay, setTotalPay] = useState({ price: 0, count: 0 });
  const [repairAct, setRepairAct] = useState(false);
  const [receiptAct, setReceiptAct] = useState(false);

  const onAddnDel = (divide: string) => {
    setLaundry((prevLaundrys) => {
      let copyLaundrys = prevLaundrys.map((obj) => {
        if (clickItems.includes(obj.productId)) {
          let count = 0;
          let price = 0;
          if (divide === 'add') count = obj.count + 1;
          else if (divide === 'del') count = obj.count - 1;
          price = (obj.price / obj.count) * count;

          if (count === 0) {
            setClickItems((prevItems) => {
              const copyClickItems = [...prevItems];
              const index = copyClickItems.indexOf(obj.productId);
              if (index === -1) {
                return prevItems;
              }
              copyClickItems.splice(index, 1);
              return copyClickItems;
            });
          }

          return {
            ...obj,
            count,
            price,
          }
        }
        return obj;
      });

      copyLaundrys = copyLaundrys.filter((obj) => obj.count !== 0);
      return copyLaundrys;
    });

    setRepair((prevLaundrys) => {
      let copyLaundrys = prevLaundrys.map((obj) => {
        if (clickItems.includes(obj.repairId)) {
          let count = 0;
          let price = 0;
          if (divide === 'add') count = obj.count + 1;
          else if (divide === 'del') count = obj.count - 1;
          price = (obj.price / obj.count) * count;

          if (count === 0) {
            setClickItems((prevItems) => {
              const copyClickItems = [...prevItems];
              const index = copyClickItems.indexOf(obj.repairId);
              if (index === -1) {
                return prevItems;
              }
              copyClickItems.splice(index, 1);
              return copyClickItems;
            });
          }

          return {
            ...obj,
            count,
            price,
          }
        }
        return obj;
      });

      copyLaundrys = copyLaundrys.filter((obj) => obj.count !== 0);
      return copyLaundrys;
    });
  };

  const onAllRemove = () => {
    setLaundry((prevLaundrys) => {
      const copyLaundrys = prevLaundrys
        .map((obj) => {
          if (clickItems.includes(obj.productId)) {
            setClickItems((prevItems) => {
              const copyClickItems = [...prevItems];
              const index = copyClickItems.indexOf(obj.productId);
              if (index === -1) {
                return prevItems;
              }
              copyClickItems.splice(index, 1);
              return copyClickItems;
            });

            return {
              productId: '',
              productName: '',
              price: 0,
              count: 0,
            };
          }
          return obj;
        })
        .filter((obj) => obj.productId);
      
      if (!clickItems.length) {
        return [];
      }
      
      return copyLaundrys;
    });

    setRepair((prevLaundrys) => {
      const copyLaundrys = prevLaundrys
        .map((obj) => {
          if (clickItems.includes(obj.repairId)) {
            setClickItems((prevItems) => {
              const copyClickItems = [...prevItems];
              const index = copyClickItems.indexOf(obj.repairId);
              if (index === -1) {
                return prevItems;
              }
              copyClickItems.splice(index, 1);
              return copyClickItems;
            });

            return {
              repairId: '',
              repairName: '',
              price: 0,
              count: 0,
            };
          }
          return obj;
        })
        .filter((obj) => obj.repairId);
      
      if (!clickItems.length) {
        return [];
      }

      return copyLaundrys;
    });
  };

  return (
    <>
      <Wrapper>
        <Top>
          <Title>{'목록'}</Title>
          <AllRemove onClick={onAllRemove}>
            <FontAwesomeIcon icon={faTrashCan} />
            {!!clickItems.length && 
              <RemoveCount>{clickItems.length}</RemoveCount>}
          </AllRemove>
        </Top>
        <ControlGroup>
          <Del onClick={() => onAddnDel('del')}>
            <FontAwesomeIcon icon={faMinus} />
          </Del>
          <Add onClick={() => onAddnDel('add')}>
            <FontAwesomeIcon icon={faPlus} />
          </Add>
        </ControlGroup>

        <RecordsOrderList
          clickItems={clickItems}
          setClickItems={setClickItems}
          setTotalPay={setTotalPay} />

        <Bottom>
          <PaymentButton
            onClick={() => setReceiptAct(true)}
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
        <RecordsReceiptPopup totalPay={totalPay} setReceiptAct={setReceiptAct} />}
    </>
  )
}

export default RecordsOrder;

const Wrapper = styled.section`
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
  bottom: -2px;
  left: 14px;
  ${includes.flexBox()}
  min-width: 15px;
  min-height: 15px;
  padding: 0 5px;
  background-color: ${colors.red};
  color: ${colors.white};
  border-radius: 4px;
  font-size: 8px;
  font-weight: 600;
`;

const ControlGroup = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
  margin-bottom: 14px;
  padding: 0 15px;

  @media ${media.pc_s} {
    margin-bottom: 20px;
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
  ${buttonStyle.primary}
  height: 60px;
  flex-grow: 1;
  border-radius: 0px;
  font-size: 15px;
`;

const AddRepair = styled.button`
  ${buttonStyle.outline}
  height: 60px;
  border-radius: 0px;
  border-bottom-right-radius: 4px;
  line-height: 1px;
  width: 70px;

  @media ${media.pc_s} {
    width: 100px;
  }
`;
