import { useSetRecoilState } from 'recoil';
import { useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { sidebarClickState } from '../../../global';
import { includes, media } from '../../../styles';
import { useResetState } from '../../../hooks';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';

function Customer() {
  console.log('Customer');

  const setSideClick = useSetRecoilState(sidebarClickState);
  const { allStateReset } = useResetState();
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
    return () => allStateReset();
  }, []);

  return (
    <Wrapper>
      <CustomerForm/>
      <CustomerList/>
    </Wrapper>
  )
}

export default Customer;

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
