import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import { sidebarClickState } from '../../../global/atoms';

function Products() {
  console.log('Products');

  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <div>
      Products!!
    </div>
  )
}

export default Products;
