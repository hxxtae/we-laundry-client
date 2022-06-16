import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { sidebarClickState } from '../../../global/atoms';
import { colors, includes, media } from '../../../styles';
import HistoryDetails from './HistoryDetails';
import HistoryList from './HistoryList';

function History() {
  console.log('History');

  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
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
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
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
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;
`;

const Group = styled.div`
  ${includes.flexBox()}
`;

