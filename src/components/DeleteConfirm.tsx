import styled from 'styled-components';
import { buttonStyle, colors, includes } from '../styles';

interface IDeleteConfirm {
  deleteId: string; // 삭제 대상 id
  onDelete: (id: string) => void; // 삭제 콜백 함수
  setDeletePop: React.Dispatch<React.SetStateAction<boolean>>; // 삭제 팝업 상태
  loading?: boolean;
  content?: string; // 삭제 안내 내용
}

function DeleteConfirm({ deleteId, onDelete, setDeletePop, loading, content }: IDeleteConfirm) {
  const popupSubmit = () => {
    onDelete(deleteId);
    setDeletePop(false);
  }

  const popupCancel = () => {
    setDeletePop(false);
  }

  return (
    <Box>
      <Text>
        {'삭제하시겠습니까?'}
        <Content>{content}</Content>
      </Text>
      <Group>
        <SubmitButton type='button' onClick={popupSubmit} disabled={loading}>{'삭제'}</SubmitButton>
        <CancelButton type='button' onClick={popupCancel} disabled={loading}>{'취소'}</CancelButton>
      </Group>
    </Box>
  )
}

export default DeleteConfirm;

const Box = styled.div`
  ${includes.flexBox()}
  flex-direction: column;
  width: 300px;
  padding: 20px 0;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

const Text = styled.p`
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  gap: 15px;
  width: 100%;
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
  /* text-align: center; */
`;

const Content = styled.strong`
  padding: 3px;
  font-size: inherit;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 4px;
  border: 1px solid ${colors.red};
  color: ${({ theme }) => theme.textColor};
`;

const Group = styled.div`
  ${includes.flexBox()}
`;

const SubmitButton = styled.button`
  ${buttonStyle.close}
  width: 80px;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  ${buttonStyle.secondary()}
  width: 80px;
`;
