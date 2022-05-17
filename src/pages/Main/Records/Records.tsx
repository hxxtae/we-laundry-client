import { useRouteMatch } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import { openState, sidebarClickState } from '../../../global/atoms';
import OpenAndClose from '../OpenAndClose/OpenAndClose';

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
        <div>
          Records!!
        </div> :
        <OpenAndClose />
      }
    </>
  )
}

export default Records;
