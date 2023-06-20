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

  const onDelete = (id: string) => {
    const recordId = id;
    if (!recordId) return;

    mutate(recordId, {
      onSuccess: () => {
        toastStyle.info('주문 내역이 삭제되었습니다.');
        const { recordDate, addname, dong } = recordState;
        if (!recordDate) {
          client.invalidateQueries(queryKeys.records.list());
          return;
        }
        client.invalidateQueries(queryKeys.records.list());
        client.invalidateQueries(queryKeys.records.listDong(addname, dong));
        client.invalidateQueries(queryKeys.sale.statsOfProduct());
      },
      onError: (error: any) => {
        toastStyle.error(error.message);
        console.log('--Record Delete Error--');
      }
    })
  }

  return (
    <>
      <Wrapper>
        <Title>{'주문 상세'}</Title>
        <GroupBox>
          <SumGroup>
            <SumTitle>{'총 주문 금액'}</SumTitle>
            <Sum>{`${recordState.recordPrice.toLocaleString()}원`}</Sum>
          </SumGroup>
          <ReceiptGroup>
            <ReceiptTitle>{'주문 내역'}</ReceiptTitle>
            <HistoryDetailList />
          </ReceiptGroup>
        </GroupBox>
        <Control>
          <UpdateButton type='button' onClick={onUpdateClick}>{`내역 수정`}</UpdateButton>
          <DeleteButton type='button' onClick={onDeleteClick}>{`내역 삭제`}</DeleteButton>
        </Control>
      </Wrapper>

      {deletePopup && 
        <Overlay>
          <DeleteConfirm deleteId={recordState.id || ''} onDelete={onDelete} setDeletePop={setDeletePopup} />
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
  padding-top: 10px;
  margin-left: 30px;
  align-items: stretch;

  @media ${media.pc_s} {
    padding-top: 13px;
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
  padding: 20px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
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

const ReceiptGroup = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const ReceiptTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.blueDark};

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

