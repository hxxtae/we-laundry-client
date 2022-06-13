import { useState } from 'react';
import styled from 'styled-components';
import { LoadingItem } from '../../../components';
import { useProductObjFetch } from '../../../hooks';
import { media, scroll } from '../../../styles';
import RecordsListHeader from './RecordsListHeader';
import RecordsListItem from './RecordsListItem';

function RecordsList() {

  const [categoryIdx, setCategoryIdx] = useState(1);
  const { loading, productObjs } = useProductObjFetch();
  

  return (
    <>
      <RecordsListHeader productObjs={productObjs} categoryIdx={categoryIdx} setCategoryIdx={setCategoryIdx} />
      <Wrapper>
        <List>
          {
            productObjs ? productObjs[categoryIdx - 1].products.map((product) => (
              <RecordsListItem key={product.productId} product={product} />
            )) : <LoadingItem />
          }
        </List>
      </Wrapper>
    </>
  )
}

export default RecordsList;

const Wrapper = styled.div`
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

