import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { LoadingItem } from '../../../../../components';
import { useProductObjFetch } from '../../../../../hooks';
import { IProductStats } from '../../../../../services/sales';

import { dragging, includes } from '../../../../../styles';
import { sortKinds } from '../SalesContext';
import CategorySaleChart from './CategorySaleChart';
import CategorySaleListContext from './CategorySaleListContext';

interface ICategorySale {
  productStats: IProductStats[];
}

function CategorySale({ productStats }: ICategorySale) {
  const [sortKind, setSortKind] = useState<sortKinds>('count');
  const [categoryIdx, setCategoryIdx] = useState(1);
  const { loading, productObjs: categoryObjs } = useProductObjFetch();

  const onClickCategoryTab = (tabIndex: number) => setCategoryIdx(tabIndex);

  const onClickCountAndPriceTab = (sortKind: sortKinds) => setSortKind(sortKind);

  // NOTE: 선택된 카테고리별 품목 filter
  const dataFilterOfCategory = () => {
    if (!productStats?.length) return [];
    if (!categoryObjs?.length) return [];
    return productStats.filter((productObj) => productObj.categoryId === categoryObjs[categoryIdx - 1].id);
  };

  // NOTE: 선택된 카테고리 품목 Sort (price & count)
  const dataSortPriceAndCount = () => {
    const sortOfCategory = dataFilterOfCategory();
    const sortOfPriceAndCount = sortOfCategory.sort((a, b) => {
      if (b[sortKind] - a[sortKind] === 0) {
        if (sortKind === 'count') return b['price'] - a['price'];
        if (sortKind === 'price') return b['count'] - a['count'];
      }
      return b[sortKind] - a[sortKind];
    }).slice(0, 10);
    return sortOfPriceAndCount;
  };

  return (
    <Section>
      <StatsGroup>
        {!loading ? 
          <>
            <CategorySaleListContext
            categoryIdx={categoryIdx}
            onClickCategoryTab={onClickCategoryTab}
            onClickCountAndPriceTab={onClickCountAndPriceTab}
            categoryObjs={categoryObjs}
            productStats={dataSortPriceAndCount()}
            sortKind={sortKind} />
            <CategorySaleChart />
          </> : <LoadingItem />}
      </StatsGroup>
    </Section>
  )
}

export default CategorySale;

const Section = styled.section`
  ${dragging.stop}
  width: 100%;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const StatsGroup = styled.div`
  ${includes.flexBox('stretch', 'space-between')}
  flex-direction: column;
  width: 100%;
`;
