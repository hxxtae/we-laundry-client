import { faArrowLeft, faCashRegister, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { recordLaundryState, recordReceiptExeState, recordRepairState, recordRequestState, recordsApi } from '../../../../global';
import { buttonStyle, colors, dragging, includes, media, scroll, toastStyle } from '../../../../styles';
import { LoadingComponent, Overlay } from '../../../../components';
import { IRecordRequest } from '../../../../services/records';
import ReceiptSuccess from './RecordReceiptComponent/ReceiptSuccess';
import { dateToString } from '../../../../components/DateComponent';
import { queryKeys } from '../../../../util';

interface IRecordReceiptPopup {
  totalPay: { price: number, count: number };
  setReceiptAct: React.Dispatch<React.SetStateAction<boolean>>;
  setClickItems: React.Dispatch<React.SetStateAction<string[]>>;
}

function RecordsReceiptPopup({ totalPay, setReceiptAct, setClickItems }: IRecordReceiptPopup) {
  const laundry = useRecoilValue(recordLaundryState);
  const repair = useRecoilValue(recordRepairState);
  const recordState = useRecoilValue(recordRequestState);
  const recordsService = useRecoilValue(recordsApi);
  const setReceiptExeChk = useSetRecoilState(recordReceiptExeState);
  const [sumLaundry, setSumLaundry] = useState({ price: 0, count: 0 });
  const [sumRepair, setSumRepair] = useState({ price: 0, count: 0 });
  const [receiptOkAct, setReceiptOkAct] = useState(false);
  const client = useQueryClient();
  const nowDate = dateToString();
  
  const { isLoading, mutate } = useMutation((_recordState: IRecordRequest) => recordsService.createRecord(_recordState));

  const onReceipt = () => {
    mutate(recordState, {
      onSuccess: () => {
        setClickItems([]);
        setReceiptOkAct(true);  // 접수 완료 확인 창
        setReceiptExeChk(true); // 접수 완료 확인
        client.invalidateQueries(queryKeys.records.listDateNow(nowDate));
        client.invalidateQueries(queryKeys.records.listDong(recordState.addname, recordState.dong));
        client.invalidateQueries(queryKeys.sale.statsOfProduct());
      },
      onError: (error: any) => {
        console.log('--Record Create Error--');
        toastStyle.error(error.message);
      }
    });
  };

  useEffect(() => {
    const sumLaundryObj = laundry.reduce((prev, curr) => ({
      price: (prev.price + curr.price),
      count: (prev.count + curr.count),
    }), { price: 0, count: 0 });
    const sumRepairObj = repair.reduce((prev, curr) => ({
      price: (prev.price + curr.price),
      count: (prev.count + curr.count),
    }), { price: 0, count: 0 });

    setSumLaundry(sumLaundryObj);
    setSumRepair(sumRepairObj);
  }, []);

  return (
    <>
      <Wrapper>
        <LeftGroup>
          <ListTitle>{'주문 내역'}</ListTitle>
          <ReceiptList>
            {laundry.map((obj) => (
              <ReceiptItem
                key={obj.productId}>
                <Item>{obj.productName}</Item>
                <Item>{obj.count}</Item>
                <Item>{`${obj.price.toLocaleString()}원`}</Item>
              </ReceiptItem>
            ))}
            {repair.map((obj) => (
              <ReceiptItem
                key={obj.repairId}>
                <Item>{obj.repairName}</Item>
                <Item>{obj.count}</Item>
                <Item>{`${obj.price.toLocaleString()}원`}</Item>
              </ReceiptItem>
            ))}
          </ReceiptList>
          <ReceiptSumBox>
            <ReceiptSum>
              <strong>{'총 세탁 금액'}</strong>
              <span>{`${sumLaundry.price.toLocaleString()}원`}</span>
            </ReceiptSum>
            <ReceiptSum>
              <strong>{'총 수선 금액'}</strong>
              <span>{`${sumRepair.price.toLocaleString()}원`}</span>
            </ReceiptSum>
            <ReceiptSum>
              <strong>{'총액'}</strong>
              <span>{`${totalPay.price.toLocaleString()}원`}</span>
            </ReceiptSum>
          </ReceiptSumBox>
        </LeftGroup>

        <RightGroup>
          <ReceiptAmount>
            <AmountTitle>{'결제 금액'}</AmountTitle>
            <Amount>{`${totalPay.price.toLocaleString()}원`}</Amount>
          </ReceiptAmount>
          <ReceiptSale>
            <SaleButton type='button'>
              <p>
                {'할인'}
                <FontAwesomeIcon icon={faChevronRight} />
              </p>
            </SaleButton>
          </ReceiptSale>
          <ReceiptPayBox>
            <ReceiptPayment onClick={onReceipt}>
              <FontAwesomeIcon icon={faCashRegister} />
              {'접수하기'}
            </ReceiptPayment>
            <ReceiptCancel
              type='button'
              onClick={() => setReceiptAct(false)} >
              <FontAwesomeIcon icon={faArrowLeft} />
              {'뒤로가기'}
            </ReceiptCancel>
          </ReceiptPayBox>
        </RightGroup>
      </Wrapper>

      
      {isLoading && 
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
        </Overlay>}
      {receiptOkAct && 
        <Overlay>
          <ReceiptSuccess
            sumLaundry={sumLaundry}
            sumRepair={sumRepair}
            setReceiptAct={setReceiptAct}
            setReceiptOkAct={setReceiptOkAct} />
        </Overlay>}
    </>
  )
}

export default RecordsReceiptPopup;

const Wrapper = styled.section`
  ${dragging.stop}
  position: absolute;
  ${includes.flexBox("flex-start", "flex-start")}
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
  overflow: hidden;
  z-index: 11;
`;

const LeftGroup = styled.div`
  ${includes.flexBox('flex-start', 'space-between')}
  flex-direction: column;
  width: 300px;
  height: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.bgColor};

  @media ${media.pc_s} {
    width: 350px;
  }
`;

const RightGroup = styled.div`
  ${includes.flexBox('flex-start', 'space-between')}
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 30px;
  background-color: ${(props) => props.theme.bgColorBlur};
`;

const ListTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.blueDark};
  margin-bottom: 10px;

  @media ${media.pc_s} {
    font-size: 16px;
  }
`;

const ReceiptList = styled.ul`
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
`;

const ReceiptItem = styled.li`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
  padding: 10px 0;
  color: ${(props) => props.theme.textColor};
  font-size: 14px;

  @media ${media.pc_s} {
    font-size: 16px;
  }
`;

const Item = styled.span`
  &:nth-of-type(2) {
    margin-left: 10px;
    color: ${colors.blue};
  }

  &:last-child {
    font-size: 15px;
    margin-left: auto;
  }

  @media ${media.pc_s} {
    &:last-child {
      font-size: 16px;
    }
  }
`;

const ReceiptSumBox = styled.ul`
  ${includes.flexBox()}
  flex-direction: column;
  width: 100%;
`;

const ReceiptSum = styled.li`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
  padding: 18px 0;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};

  &:last-child {
    padding-bottom: 0px;
  }

  @media ${media.pc_s} {
    font-size: 18px;
  }
`;

const ReceiptAmount = styled.div`
  flex-grow: 1;
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  width: 100%;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const AmountTitle = styled.h2`
  font-size: 16px;

  @media ${media.pc_s} {
    font-size: 18px;
  }
`;

const Amount = styled.strong`
  padding: 12px 0;
  font-size: 34px;
  color: ${colors.blue};

  @media ${media.pc_s} {
    font-size: 44px;
  }
`;

const ReceiptSale = styled.div`
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const SaleButton = styled.button`
  ${includes.flexBox('flex-start', 'flex-start')}
  ${buttonStyle.outline}
  width: 200px;
  height: 70px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  
  svg {
    padding-left: 5px;
  }

  @media ${media.pc_s} {
    width: 220px;
    height: 80px;
    font-size: 15px;
  }
`;

const ReceiptPayBox = styled.div`
  ${includes.flexBox()}
  padding-top: 15px;
  ${dragging.stop}
`;

const ReceiptPayment = styled.button`
  ${includes.flexBox()}
  flex-direction: column;
  ${buttonStyle.primary()}
  width: 130px;
  height: 80px;
  margin-right: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);

  svg {
    font-size: 22px;
    margin-bottom: 5px;
  }

  @media ${media.pc_s} {
    width: 150px;
    height: 90px;
  }
`;

const ReceiptCancel = styled.button`
  ${includes.flexBox()}
  flex-direction: column;
  ${buttonStyle.secondary}
  width: 130px;
  height: 80px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);

  svg {
    font-size: 22px;
    margin-bottom: 5px;
  }

  @media ${media.pc_s} {
    width: 150px;
    height: 90px;
  }
`;

