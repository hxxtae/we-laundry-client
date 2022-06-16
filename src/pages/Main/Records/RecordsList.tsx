import { useState } from 'react';
import styled from 'styled-components';

import { includes, media, scroll } from '../../../styles';
import { useProductObjFetch } from '../../../hooks';
import { LoadingItem } from '../../../components';
import RecordsListHeader from './RecordsListHeader';
import RecordsListItem from './RecordsListItem';

function RecordsList() {

  const [categoryIdx, setCategoryIdx] = useState(1);
  const { loading, productObjs } = useProductObjFetch();
  

  return (
    <>
      <RecordsListHeader productObjs={productObjs} categoryIdx={categoryIdx} setCategoryIdx={setCategoryIdx} />
      <Wrapper>
        {!loading ?
          <List>
            {productObjs[categoryIdx - 1].products.map((product) => (
              <RecordsListItem key={product.productId} product={product} />
            ))}
          </List> :
          <LoadingBox>
            <LoadingItem />
          </LoadingBox>}
      </Wrapper>
    </>
  )
}

export default RecordsList;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 370px;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;

  @media ${media.pc_s} {
    padding: 20px;
    height: 460px;
  }

  @media ${media.pc_l} {
    width: 692px;
  }
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
  overflow-y: auto;
  overflow-x: hidden;
`;

const LoadingBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${includes.flexBox()}
  width: 100%;
  height: 100%;
`;

