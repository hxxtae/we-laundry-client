import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { LoadingComponent, Overlay } from '../../../components';
import { sidebarClickState } from '../../../global';
import { includes, media } from '../../../styles';
import { useProductObjFetch } from '../../../hooks';
import ProductsList from './ProductsList';
import CategorysTabs from './CategorysTabs';

function Products() {
  console.log('Products');

  const setSideClick = useSetRecoilState(sidebarClickState);
  const [categoryIdx, setCategoryIdx] = useState(1);
  const { loading, reLoading, productObjs } = useProductObjFetch();
  const { path } = useRouteMatch();

  useEffect(() => {
    setSideClick(path);
  }, []);

  return (
    <Wrapper>
      <CategorysTabs productObjs={productObjs} categoryIdx={categoryIdx} setCategoryIdx={setCategoryIdx} />
      {productObjs?.map((productObj, index) => (
          (index + 1) === categoryIdx && 
          <ProductsList
            key={productObj.id}
            reLoading={reLoading}
            productObj={productObj} />
      ))}

      {loading &&
      <Overlay>
        <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
      </Overlay>}
    </Wrapper>
  )
}

export default Products;

const Wrapper = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media ${media.pc_s} {
    width: 860px;
  }
`;
