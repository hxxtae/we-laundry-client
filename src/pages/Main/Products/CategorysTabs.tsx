import styled from 'styled-components';
import { faPlus, faChevronLeft, faChevronRight, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { IProductObjResponse, ICategoryRequest } from '../../../services/products';
import { productDelState, productsApi, productUpdState } from '../../../global';
import { buttonStyle, colors, includes, media } from '../../../styles';
import { LoadingComponent, Overlay } from '../../../components';
import { usePaging } from '../../../hooks';
import CategoryPopup from './CategorysPopup';
import SettingMenu from './SettingMenu';

interface ICategorysTabs {
  productObjs: IProductObjResponse[];
  categoryIdx: number;
  setCategoryIdx: React.Dispatch<React.SetStateAction<number>>;
}

function CategorysTabs({ productObjs, categoryIdx, setCategoryIdx }: ICategorysTabs) {
  console.log("CategoryTabs");
  
  const [popupActive, setPopupActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [updActive, setUpdActive] = useState(false);
  const [delActive, setDelActive] = useState(false);
  const updProActive = useRecoilValue(productUpdState);
  const delProActive = useRecoilValue(productDelState);
  const productsService = useRecoilValue(productsApi);

  const { isLoading: insAndUpdLoading, mutate } = useMutation(
    updActive ?
      ({ id, categoryName }: ICategoryRequest) => productsService.updateCategory({ id, categoryName }) :
      ({ categoryName }: ICategoryRequest) => productsService.createCategory({ categoryName }));

  const { isLoading: delLoading, mutate: delMutate } = useMutation((id: string) => productsService.deleteCategory(id));
  
  const { fetchDatas, prevPage, nextPage, pageSort: { ASC } } = usePaging(productObjs, productObjs?.length, 5, 1);

  const onPopup = () => {
    setPopupActive(true);
    setMenuActive(false);
  }

  return (
    <>
      <TabsGroup>
        <TabList>
        {fetchDatas?.map((productObj, index) => (
          <Wrapper key={productObj.id}>
            <Tab
              type='button'
              onClick={() => setCategoryIdx(ASC(index))}
              disabled={updProActive || delProActive}>
              {productObj.categoryName}
            </Tab>
            {ASC(index) === categoryIdx &&
              <TabLine layoutId='tabline' />}
          </Wrapper>
        ))}
        <Wrapper>
            <Tab
              type='button'
              onClick={onPopup}
              disabled={updProActive || delProActive}>
            <FontAwesomeIcon icon={faPlus} /> {'추가'}
          </Tab>
          </Wrapper>
        </TabList>

        <TabControl>
          <TabMove onClick={prevPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </TabMove>
          <TabMove onClick={nextPage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </TabMove>
          <TabSetting onClick={() => setMenuActive((prev) => !prev)}>
            <FontAwesomeIcon icon={faGear} />
          </TabSetting>
        </TabControl>
      </TabsGroup>

      {popupActive && <CategoryPopup
        setPopupActive={setPopupActive}
        setUpdActive={setUpdActive}
        setDelActive={setDelActive}
        mutate={mutate}
        delMutate={delMutate}
        updActive={updActive}
        delActive={delActive} />}
      {menuActive && <SettingMenu
        setMenuActive={setMenuActive}
        setPopupActive={setPopupActive}
        setUpdCateAct={setUpdActive}
        setDelCateAct={setDelActive} />}
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
  ${buttonStyle.base}
  padding: 15px;
  color: ${(props) => props.theme.textColor};
  font-size: 12px;

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

const TabMove = styled.button`
  ${includes.flexBox()}
  color: ${(props) => props.theme.textColor};
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 4px;
  transition: background-color 200ms ease-in-out;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: .6;
    background-color: ${(props) => props.theme.borderColor};
  }
`;

const TabSetting = styled.button`
  ${includes.flexBox()}
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

