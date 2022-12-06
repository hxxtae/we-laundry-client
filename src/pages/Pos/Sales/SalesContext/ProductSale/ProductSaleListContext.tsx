import styled from 'styled-components';

import { media } from '../../../../../styles';
import { IProductStats } from '../../../../../services/sales';
import { sortKinds } from '../SalesContext';
import ProductSaleList from './ProductSaleList';

interface IProductSaleListContext {
  totalCountAndPriceSort: IProductStats[];
  sortKind: sortKinds;
}

function ProductSaleListContext({ totalCountAndPriceSort, sortKind }: IProductSaleListContext) {
  return (
    <ListGroup>
      <Title>{'전체 품목 통계'}</Title>
      <ProductSaleList totalCountAndPriceSort={totalCountAndPriceSort} sortKind={sortKind} />
    </ListGroup>
  )
}

export default ProductSaleListContext;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

const ListGroup = styled.div`
  flex-grow: 1;
  margin-right: 20px;

  @media ${media.pc_s} {
    margin-right: 60px;
  }

  @media ${media.pc_l} {
    width: 450px;
  }
`;
