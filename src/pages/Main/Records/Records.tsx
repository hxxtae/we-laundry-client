import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';

import { openState, sidebarClickState } from '../../../global/atoms';
import { recordRequestState } from '../../../global';
import { includes, media } from '../../../styles';
import OpenAndClose from '../OpenAndClose/OpenAndClose';
import RecordsForm from './RecordsForm';
import RecordsList from './RecordsList';
import RecordsOrder from './RecordsOrder';
import { useResetState } from '../../../hooks';

function Records() {
  console.log('Records');
  
  const open = useRecoilValue(openState);
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { allStateReset } = useResetState();
  const { path } = useRouteMatch();
  const record = useRecoilValue(recordRequestState);
  
  useEffect(() => {
    setSideClick(path);
    return () => allStateReset();
  }, []);

  console.log(record)
  
  return (
    <>
      {open ?
        <Wrapper>
          <ContextBox>
            <RecordsForm />
            <RecordsList />
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

  @media ${media.pc_l} {
    width: auto;
  }
`;

const ContextBox = styled.div`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  width: 100%;

  @media ${media.pc_l} {
    width: auto;
  }
`;
