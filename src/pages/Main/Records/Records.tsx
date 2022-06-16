import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';

import { openState, recordLaundryState, recordRepairState, sidebarClickState } from '../../../global/atoms';
import { recordRequestState } from '../../../global';
import { includes, media } from '../../../styles';
import OpenAndClose from '../OpenAndClose/OpenAndClose';
import RecordsForm from './RecordsForm';
import RecordsList from './RecordsList';
import RecordsOrder from './RecordsOrder';

function Records() {
  console.log('Records');
  
  const open = useRecoilValue(openState);
  const setSideClick = useSetRecoilState(sidebarClickState);
  const recordState = useResetRecoilState(recordRequestState);   // Record Request State 초기화
  const recordLaundry = useResetRecoilState(recordLaundryState); // Record laundry Array State 초기화
  const recordRepair = useResetRecoilState(recordRepairState);   // Record repair Array State 초기화
  const { path } = useRouteMatch();
  const record = useRecoilValue(recordRequestState);
  
  useEffect(() => {
    setSideClick(path);
    return () => {
      recordState();
      recordLaundry();
      recordRepair();
    }
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
  width: 100%;

  @media ${media.pc_l} {
    width: auto;
  }
`;

const ContextBox = styled.div`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media ${media.pc_l} {
    width: auto;
  }
`;
