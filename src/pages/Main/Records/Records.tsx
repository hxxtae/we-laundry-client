import { useRouteMatch } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { openState, sidebarClickState } from '../../../global/atoms';
import OpenAndClose from '../OpenAndClose/OpenAndClose';
import styled from 'styled-components';
import { includes, media } from '../../../styles';
import RecordsForm from './RecordsForm';
import { recordRequestState } from '../../../global';
import RecordsList from './RecordsList';
import RecordsOrder from './RecordsOrder';

function Records() {
  console.log('Records');
  
  const open = useRecoilValue(openState);
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  const record = useRecoilValue(recordRequestState);
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  console.log(record)
  
  return (
    <>
      {open ?
        <Wrapper>
          <LeftBox>
            <RecordsForm />
            <RecordsList />
          </LeftBox>
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
  width: 100%;

  @media ${media.pc_l} {
    width: auto;
  }
`;

const LeftBox = styled.div`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media ${media.pc_l} {
    width: auto;
  }
`;
