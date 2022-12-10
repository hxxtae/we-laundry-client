import { motion } from 'framer-motion';
import styled from 'styled-components';

import { IProductObjResponse } from '../../../../../services/products';
import { buttonStyle, colors, includes, scroll } from '../../../../../styles';
import { sortKinds } from '../SalesContext';

interface ICategorySaleTab {
  categoryObjs: IProductObjResponse[];
  categoryIdx: number;
  onClickCategoryTab: (tabIndex: number) => void;
}

function CategorySaleTab({ categoryObjs, categoryIdx, onClickCategoryTab }: ICategorySaleTab) {

  return (
    <CategoryTabs>
      {categoryObjs?.map((productObj, idx) => (
        <CategoryTab key={productObj.id} onClick={() => onClickCategoryTab(idx + 1)}>
          {productObj.categoryName}
          {(idx + 1) === categoryIdx && <TabLine layoutId='tabLine' />}
        </CategoryTab>))}
    </CategoryTabs>
  )
}

export default CategorySaleTab;

const CategoryTabs = styled.ul`
  max-width: 50%;
  ${includes.flexBox('center', 'flex-start')};
  ${({ theme }) => scroll.custom(0, theme.bgColorSub, theme.textColor)};
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 4px;
  }
`;

const CategoryTab = styled.li`
  position: relative;
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};
  ${buttonStyle.base()}
  padding: 10px;
  flex-shrink: 0;
`;

const TabLine = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 3px solid ${colors.blue};
  border-radius: 5px;
`;
