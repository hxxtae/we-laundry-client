import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import styled from 'styled-components';

import { sidebarClickState } from '../../../global/atoms';
import { media } from '../../../styles';
import { SalesContext } from './SalesContext';


function Sales() {
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <Wrapper>
      <SalesContext />
    </Wrapper>
  )
}

export default Sales;

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  @media ${media.pc_l} {
    width: auto;
  }
`;