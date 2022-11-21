import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { sidebarClickState } from '../../../global/atoms';
import { useResetState } from '../../../hooks';
import { includes, media } from '../../../styles';
import HistoryDetails from './HistoryDetails';
import HistoryList from './HistoryList';

function History() {
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { allStateReset } = useResetState();
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
    return () => allStateReset();
  }, []);

  return (
    <Wrapper>
      <Title>{'주문 내역'}</Title>
      <Group>
        <HistoryList />
        <HistoryDetails />
      </Group>
    </Wrapper>
  )
}

export default History;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  overflow: hidden;

  @media ${media.pc_l} {
    width: auto;
  }
`;

const Title = styled.h1`
  width: 100%;
  height: 30px;
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;
`;

const Group = styled.div`
  ${includes.flexBox('flex-start', 'flex-start')}
  align-items: stretch;
`;

