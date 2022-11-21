import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import styled from 'styled-components';

import { sidebarClickState } from '../../../global/atoms';
import { includes, media } from '../../../styles';
import ProductSale from './ProductSale';

function Sales() {
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <Wrapper>
      <ProductSale />
    </Wrapper>
  )
}

export default Sales;

const Wrapper = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'flex-start')}
  align-items: stretch;
  width: 100%;

  @media ${media.pc_l} {
    width: auto;
  }
`;