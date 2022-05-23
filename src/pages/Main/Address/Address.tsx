import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { sidebarClickState } from '../../../global/atoms';
import { includes, media } from '../../../styles';
import AddressForm from './AddressForm';
import AddressList from './AddressList';

function Address() {
  console.log('Address');
  
  const setSideClick = useSetRecoilState(sidebarClickState);
  const [addressData, setAddressData] = useState({
    id: '',
    addname: '',
    addfullname: '',
  });
  const [updateActive, setUpdateActive] = useState(false);
  const { path } = useRouteMatch();
    
  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <Wrapper>
      <AddressForm addressData={addressData} updateActive={updateActive} setUpdateActive={setUpdateActive} />
      <AddressList setAddressData={setAddressData} setUpdateActive={setUpdateActive} />
    </Wrapper>
  )
}

export default Address;

const Wrapper = styled.div`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColorSub};
  transition: background-color 200ms ease-in-out;

  @media ${media.pc_s} {
    width: auto;
  }
`;




