import { faPlus, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { categoryPopupState, menuPopupState, productsApi, productsPopupState } from '../../../global';
import { IProductObjResponse, ICategoryRequest } from '../../../services/products';
import { buttonStyle, colors, includes, media } from '../../../styles';
import { LoadingComponent, Overlay, Pagination } from '../../../components';
import { usePaging } from '../../../hooks';
import CategoryPopup from './CategorysPopup';
import SettingMenu from './SettingMenu';

interface ICategorysTabs {
  productObjs: IProductObjResponse[];
  categoryIdx: number;
  setCategoryIdx: React.Dispatch<React.SetStateAction<number>>;
}

function CategorysTabs({ productObjs, categoryIdx, setCategoryIdx }: ICategorysTabs) {
  const productsService = useRecoilValue(productsApi);
  const [categoryPopup, setCategoryPopup] = useRecoilState(categoryPopupState);
  const productsPopup = useRecoilValue(productsPopupState);
  const [menuPopup, setMenuPopup] = useRecoilState(menuPopupState);
  
  const { isLoading: insAndUpdLoading, mutate } = useMutation(
    categoryPopup.updatePopup ?
      ({ id, categoryName }: ICategoryRequest) => productsService.updateCategory({ id, categoryName }) :
      ({ categoryName }: ICategoryRequest) => productsService.createCategory({ categoryName }));
  const { isLoading: delLoading, mutate: delMutate } = useMutation((id: string) => productsService.deleteCategory(id));
  const pageObj = usePaging(productObjs, productObjs?.length, 5, 1);

  const onAddCategory = () => {
    setCategoryPopup((prev) => ({
      ...prev,
      mainPopup: true,
      createPopup: true,
    }));
    setMenuPopup(false);
  }

  return (
    <>
      <TabsGroup>
        <TabList>
        {pageObj.fetchDatas?.map((productObj, index) => (
          <Wrapper key={productObj.id}>
            <Tab
              type='button'
              onClick={() => setCategoryIdx(pageObj.pageSort.ASC(index))}
              disabled={productsPopup.updatePopup || productsPopup.deletePopup}>
              {productObj.categoryName}
            </Tab>
            {pageObj.pageSort.ASC(index) === categoryIdx &&
              <TabLine layoutId='tabline' />}
          </Wrapper>
        ))}
          <Wrapper>
            <Tab
              type='button'
              onClick={onAddCategory}
              disabled={productsPopup.updatePopup || productsPopup.deletePopup}>
              <FontAwesomeIcon icon={faPlus} />
              <span>{'추가'}</span>
          </Tab>
          </Wrapper>
        </TabList>

        <TabControl>
          <Pagination {...pageObj} noShowPage={true} />
          <TabSetting onClick={() => setMenuPopup((prev) => !prev)} disabled={!productObjs?.length}>
            <FontAwesomeIcon icon={faGear} />
          </TabSetting>
        </TabControl>
      </TabsGroup>

      {categoryPopup.mainPopup && <CategoryPopup mutate={mutate} delMutate={delMutate} />}
      {menuPopup && <SettingMenu />}
      
      {(insAndUpdLoading || delLoading) && 
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
        </Overlay>}
    </>
  )
}

export default CategorysTabs;

const TabsGroup = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
`;

const TabList = styled.div`
  ${includes.flexBox('center', 'flex-start')}
`;

const Wrapper = styled.div`
  position: relative;
  ${includes.flexBox()}

  &:last-child {
    button {
      ${includes.flexBox()}
      font-size: 12px;

      &:active {
        opacity: .6;
      }
    }
  }
`;

const Tab = styled.button`
  flex-shrink: 0;
  ${buttonStyle.base()}
  padding: 15px;
  color: ${(props) => props.theme.textColor};
  font-size: 12px;

  span {
    flex-shrink: 0;
  }

  @media ${media.pc_s} {
    font-size: 14px;
  }
`;

const TabLine = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 3px solid ${colors.blue};
  border-radius: 5px;
`;

const TabControl = styled.div`
  ${includes.flexBox()}
`;

const TabSetting = styled.button`
  ${includes.flexBox()}
  flex-shrink: 0;
  color: ${(props) => props.theme.textColor};
  width: 30px;
  height: 30px;
  border-radius: 4px;
  transition: background-color 200ms ease-in-out;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: .6;
    background-color: ${(props) => props.theme.borderColor};
  }
`;

