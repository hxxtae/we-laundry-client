import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { sidebarClickState } from '../../../global/atoms';

function Sales() {
  console.log('Sales');

  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <div>
      Sales!!
    </div>
  )
}

export default Sales;
