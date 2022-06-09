import { useRouteMatch } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import { openState, sidebarClickState } from '../../../global/atoms';
import OpenAndClose from '../OpenAndClose/OpenAndClose';
import styled from 'styled-components';
import { includes, media } from '../../../styles';
import RecordsForm from './RecordsForm';

function Records() {
  console.log('Records');

  const open = useRecoilValue(openState);
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);
  
  return (
    <>
      {open ?
        <Wrapper>
          <RecordsForm />
        </Wrapper> :
        <OpenAndClose />}
    </>
  )
}

export default Records;

const Wrapper = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media ${media.pc_s} {
    width: auto;
  }
`;
