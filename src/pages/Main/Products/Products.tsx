import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useProductObjFetch, useResetState } from '../../../hooks';
import { LoadingComponent, Overlay } from '../../../components';
import { dragging, includes, media } from '../../../styles';
import { sidebarClickState } from '../../../global';
import ProductsList from './ProductsList';
import CategorysTabs from './CategorysTabs';

function Products() {
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { allStateReset } = useResetState();
  const [categoryIdx, setCategoryIdx] = useState(1);
  const { loading, reLoading, productObjs } = useProductObjFetch();
  const { path } = useRouteMatch();

  useEffect(() => {
    setSideClick(path);
    return () => allStateReset();
  }, []);

  return (
    <Wrapper>
      <CategorysTabs productObjs={productObjs} categoryIdx={categoryIdx} setCategoryIdx={setCategoryIdx} />
      {!!(productObjs?.length) ? productObjs.map((productObj, index) => (
          (index + 1) === categoryIdx && 
          <ProductsList
            key={productObj.id}
            reLoading={reLoading}
            productObj={productObj} />
      )) :
        <NotFound>
          <FontAwesomeIcon icon={faBoxOpen} />
          <span>{'카테고리와 품목을 추가해 주세요.'}</span>
        </NotFound>}

      {loading &&
      <Overlay>
        <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
      </Overlay>}
    </Wrapper>
  )
}

export default Products;

const Wrapper = styled.div`
  ${dragging.stop}
  position: relative;
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media ${media.pc_s} {
    width: 860px;
  }
`;

const NotFound = styled.div`
  ${includes.flexBox()}
  flex-direction: column;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bgColor};
  min-height: 386px;
  color: ${({ theme }) => theme.textColor};

  svg {
    font-size: 30px;
    opacity: .3;
  }

  span {
    padding: 15px 0;
    font-size: 14px;
    opacity: .3;
  }

  @media ${media.pc_s} {
    min-height: 470px;

    span {
      font-size: 15px;
    }
  }
`;
