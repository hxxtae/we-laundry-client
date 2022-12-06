import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';

import { openState, sidebarClickState } from '../../../global/atoms';
import { includes, media } from '../../../styles';
import { useResetState } from '../../../hooks';
import OpenAndClose from '../OpenAndClose/OpenAndClose';
import RecordsForm from './RecordsForm';
import RecordsOrder from './RecordsOrder';
import RecordsListContext from './RecordsListContext';

function Records() {
  const open = useRecoilValue(openState);
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { allStateReset } = useResetState();
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
    return () => allStateReset();
  }, []);
  
  return (
    <>
      {open ?
        <Wrapper>
          <ContextBox>
            <RecordsForm />
            <RecordsListContext />
          </ContextBox>
          <RecordsOrder />
        </Wrapper> :
        <OpenAndClose />}
    </>
  )
}

export default Records;

const Wrapper = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'flex-start')}
  align-items: stretch;
  width: 100%;
`;

const ContextBox = styled.div`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;

  @media ${media.pc_l} {
    width: 692px;
  }
`;
