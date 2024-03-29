import styled from 'styled-components';
import { IProductObjResponse } from '../../../../../services/products';
import { IProductStats } from '../../../../../services/sales';

import { buttonStyle, colors, includes, media } from '../../../../../styles';
import { sortKinds } from '../SalesContext';
import CategorySaleList from './CategorySaleList';
import CategorySaleTab from './CategorySaleTab';

interface ICategorySaleListContext {
  categoryIdx: number;
  onClickCategoryTab: (tabIndex: number) => void;
  onClickCountAndPriceTab: (sortKind: sortKinds) => void;
  categoryObjs: IProductObjResponse[];
  productStats: IProductStats[];
  sortKind: sortKinds;
}

function CategorySaleListContext({ categoryIdx, onClickCategoryTab, onClickCountAndPriceTab, categoryObjs, productStats, sortKind }: ICategorySaleListContext) {
  return (
    <ListGroup>
      <Wrapper>
        <Title>{'카테고리별 품목 통계'}</Title>
        <Tabs>
          <Tab type='button' onClick={() => onClickCountAndPriceTab('count')} state={sortKind === 'count'}>{'누적 개수'}</Tab>
          <Tab type='button' onClick={() => onClickCountAndPriceTab('price')} state={sortKind === 'price'}>{'누적 금액'}</Tab>
        </Tabs>
      </Wrapper>
      <CategorySaleTab
        categoryIdx={categoryIdx}
        onClickCategoryTab={onClickCategoryTab}
        categoryObjs={categoryObjs} />
      <CategorySaleList productStats={productStats} sortKind={sortKind} />
    </ListGroup>
  )
}

export default CategorySaleListContext;


const ListGroup = styled.div`
  flex-grow: 1;
  // NOTE: CategorySaleChart 컴포넌트 추가 시 적용
  //margin-right: 20px;

  @media ${media.pc_s} {
    // NOTE: CategorySaleChart 컴포넌트 추가 시 적용
    //margin-right: 60px;
  }

  @media ${media.pc_l} {
    // NOTE: CategorySaleChart 컴포넌트 추가 시 적용
    //width: 450px;
  }
  `;

  const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.textColor};

    &:after {
      content: '(단위: 원)';
      font-size: 11px;
      color: ${({ theme }) => theme.borderColorSub};
      margin-left: 7px;
    }
  `;

const Wrapper = styled.nav`
  ${includes.flexBox('center', 'space-between')};
`;

const Tabs = styled.div`
  margin-bottom: auto;
`;

const Tab = styled.button<{ state: boolean }>`
  ${buttonStyle.primary()}
  background-color: ${({ state }) => state ? colors.blue : colors.borderDark};

  &:last-child {
    margin-left: 5px;
  }
`;
