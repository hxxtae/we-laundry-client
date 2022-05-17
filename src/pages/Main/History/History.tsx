import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { sidebarClickState } from '../../../global/atoms';

function History() {
  console.log('History');

  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <div>
      History!!
    </div>
  )
}

export default History;
