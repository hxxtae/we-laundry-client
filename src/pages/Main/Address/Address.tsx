import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { sidebarClickState } from '../../../global/atoms';

function Address() {
  console.log('Address');

  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <div>
      Address!!
    </div>
  )
}

export default Address;
