import styled from 'styled-components';

import { IProductObjResponse } from '../../../services/products';
import { scroll } from '../../../styles';
import RecordsListItem from './RecordsListItem';

// NOTE: 나중에 Record DTO에 따로 선언해 두어야 한다.
interface IRecordList {
  productObjs: IProductObjResponse[];
  categoryIdx: number;
}

function RecordsList({ categoryIdx, productObjs }: IRecordList) {

  return (
    <List>
      {productObjs[categoryIdx - 1].products.map((product) => (
        <RecordsListItem
          key={product.productId}
          product={product}
          categoryId={productObjs[categoryIdx - 1].id}
          categoryName={productObjs[categoryIdx - 1].categoryName}
        />
      ))}
    </List>
  )
}

export default RecordsList;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
`;
