import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { sidebarClickState } from '../../../global/atoms';

function Customer() {
  console.log('Customer');

  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <div>
      Customer!!
    </div>
  )
}

export default Customer;
