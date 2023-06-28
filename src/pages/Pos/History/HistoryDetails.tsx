import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import styled from 'styled-components';

import { buttonStyle, colors, dragging, includes, media, toastStyle } from '../../../styles';
import { DeleteConfirm, LoadingComponent, Overlay } from '../../../components';
import { recordRequestState, recordsApi } from '../../../global';
import { queryKeys } from '../../../util';
import HistoryDetailList from './HistoryDetailList';

function HistoryDetails() {
  const recordState = useRecoilValue(recordRequestState);
  const recordService = useRecoilValue(recordsApi);
  const [deletePopup, setDeletePopup] = useState(false);
  const client = useQueryClient();
  const { isLoading, mutate } = useMutation((id: string) => recordService.deleteRecord(id));

  const onUpdateClick = () => {
    alert('준비중 입니다. *^^*');
  }

  const onDeleteClick = () => {
    if (!recordState.id) {
      alert('주문 내역을 선택해 주세요.');
      return;
    }
    setDeletePopup(true);
  }

  const onDeleteContent = () => {
    const { addname, dong, ho } = recordState;
    return `${addname} ${dong} - ${ho}`;
  }

  const onDelete = (id: string) => {
    const recordId = id;
    if (!recordId) return;

    mutate(recordId, {
      onSuccess: () => {
        toastStyle.info('주문 내역이 삭제되었습니다.');
        client.invalidateQueries(queryKeys.records.list());
        client.invalidateQueries(queryKeys.sale.statsOfProduct());
      },
      onError: (error: any) => {
        toastStyle.error(error.message);
        console.log('--Record Delete Error--');
      }
    })
  }

  const onReceiptPrice = () => {
    const { recordPrice, recordSale, recordSalePrice } = recordState;
    return recordSale ? recordSalePrice : recordPrice;
  }

  const onSaleComponent = () => {
    return (
      recordState.recordSale ? 
      <SalePrice>
        <h3>{'결제 할인'}</h3>
        <strong>{`${recordState.recordSale.toLocaleString()}원`}</strong>
      </SalePrice> : null
    )
  }

  return (
    <>
      <Wrapper>
        <Title>{'주문 상세'}</Title>
        <GroupBox>
          <SumGroup>
            <SumTitle>{'총 결제 금액'}</SumTitle>
            <Sum>{`${onReceiptPrice().toLocaleString()}원`}</Sum>
          </SumGroup>
          <SaleGroup>
            <Total>
              <h3>{'합계'}</h3>
              <strong>{`${recordState.recordPrice.toLocaleString()}원`}</strong>
            </Total>
            {onSaleComponent()}
          </SaleGroup>
          <ReceiptGroup>
            <ReceiptTitle>{'결제 내역'}</ReceiptTitle>
            <HistoryDetailList />
          </ReceiptGroup>
        </GroupBox>
        <Control>
          {/* <UpdateButton type='button' onClick={onUpdateClick}>{`내역 수정`}</UpdateButton> */}
          <DeleteButton type='button' onClick={onDeleteClick}>{`내역 삭제`}</DeleteButton>
        </Control>
      </Wrapper>

      {deletePopup && 
        <Overlay>
          <DeleteConfirm
            deleteId={recordState.id || ''}
            content={onDeleteContent()}
            onDelete={onDelete}
            setDeletePop={setDeletePopup} />
        </Overlay>}
      {isLoading && 
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
        </Overlay>}
    </>
  )
}

export default HistoryDetails;

const Wrapper = styled.section`
  flex-grow: 1;
  ${dragging.stop}
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  margin-left: 30px;
  align-items: stretch;

  @media ${media.pc_s} {
    margin-left: 40px;
  }

  @media ${media.pc_l} {
    width: 582px;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;

  @media ${media.pc_s} {
    font-size: 16px;
  }
`;

const GroupBox = styled.div`
  color: ${(props) => props.theme.textColor};
`;

const SumGroup = styled.div`
  padding: 20px 0 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  @media ${media.pc_s} {
    padding: 20px 0;
  }
`;

const SumTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.blueDark};

  @media ${media.pc_s} {
    font-size: 15px;
  }
`;

const Sum = styled.span`
  font-size: 30px;
  font-weight: 600;

  @media ${media.pc_s} {
    font-size: 38px;
  }
`;

const SaleGroup = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  font-size: 15px;

  strong {
    font-size: 18px;
  }

  @media ${media.pc_s} {
    padding: 20px 0;
  }
`;

const Total = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 70%;
  font-weight: 600;
`;

const SalePrice = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 70%;
  margin-top: 20px;
`;

const ReceiptGroup = styled.div`
  padding-top: 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const ReceiptTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.blueDark};
  padding-bottom: 5px;

  @media ${media.pc_s} {
    font-size: 15px;
  }
`;

const Control = styled.div`
  ${includes.flexBox('center', 'flex-start')}
  margin-top: auto;
`;

const UpdateButton = styled.button`
  ${buttonStyle.outline}
  width: 100px;
  height: 40px;
  margin-right: 5px;

  @media ${media.pc_s} {
    width: 140px;
  }
`;

const DeleteButton = styled.button`
  ${buttonStyle.close}
  width: 100px;
  height: 40px;

  @media ${media.pc_s} {
    width: 140px;
  }
`;

