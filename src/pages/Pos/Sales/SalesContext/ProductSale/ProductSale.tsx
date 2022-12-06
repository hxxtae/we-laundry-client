import { useState } from 'react';
import styled from 'styled-components';

import { IProductStats } from '../../../../../services/sales';
import { dragging, includes } from '../../../../../styles';
import { sortKinds } from '../SalesContext';
import ProductSaleListContext from './ProductSaleListContext';
import ProductSaleChart from './ProductSaleChart';

interface IProductSale {
  productStats: IProductStats[];
}

function ProductSale({ productStats }: IProductSale) {
  const [sortKind, setSortKind] = useState<sortKinds>('count');

  // NOTE: 전체 품목 Sort (price & count)
  const dataSortCountAndPrice = (): IProductStats[] => {
    if (!productStats?.length) return [];
    const copyProductStatsArr = [...productStats!];
    const sortProductStatsArr = copyProductStatsArr.sort((a, b) => {
      if (b[sortKind] - a[sortKind] === 0) {
        if (sortKind === 'count') return b['price'] - a['price'];
        if (sortKind === 'price') return b['count'] - a['count'];
      }
      return b[sortKind] - a[sortKind];
    }).slice(0, 10);
    
    return sortProductStatsArr;
  };

  return (
    <Section>
      <StatsGroup>
        <ProductSaleListContext totalCountAndPriceSort={dataSortCountAndPrice()} sortKind={sortKind}  />
        <ProductSaleChart totalCountAndPriceSort={dataSortCountAndPrice()} sortKind={sortKind} setSortKind={setSortKind} />
      </StatsGroup>
    </Section>
  )
}

export default ProductSale;

const Section = styled.section`
  ${dragging.stop}
  width: 100%;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const StatsGroup = styled.div`
  ${includes.flexBox('stretch', 'space-between')}
  width: 100%;
`;

