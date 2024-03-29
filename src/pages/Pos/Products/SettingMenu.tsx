import { faFileCircleMinus, faFileCirclePlus, faFolderMinus, faFolderOpen, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { categoryPopupState, menuPopupState,productsPopupState } from '../../../global';
import { buttonStyle, includes, media, toastStyle } from '../../../styles';

function SettingMenu() {
  const setCategoryPopup = useSetRecoilState(categoryPopupState);
  const [productsPopup, setProductsPopup] = useRecoilState(productsPopupState);
  const setMenuPopup = useSetRecoilState(menuPopupState);

  const onClick = (btnIdx: number) => {
    if (btnIdx === 0) {
      setCategoryPopup(prev => ({
        ...prev,
        mainPopup: true,
        updatePopup: true
      }));

    } else if (btnIdx === 1) {
      setCategoryPopup(prev => ({
        ...prev,
        mainPopup: true,
        deletePopup: true
      }));

    } else if (btnIdx === 2) {
      setProductsPopup(prev => ({
        ...prev,
        mainPopup: true,
        createPopup: true
      }));

    } else if (btnIdx === 3) {
      if (!productsPopup.updatePopup) {
        setProductsPopup(prev => ({
          ...prev,
          updatePopup: true,
        }));
        toastStyle.infoSecondary('변경 항목을 선택해주세요.');
      }
      if(productsPopup.updatePopup) {
        setProductsPopup(prev => ({
          ...prev,
          updatePopup: false,
        }));
      }

    } else if (btnIdx === 4) {
      if (!productsPopup.deletePopup) {
        setProductsPopup(prev => ({
          ...prev,
          deletePopup: true
        }));
        toastStyle.infoSecondary('삭제 항목을 선택해주세요.');
      }
      if(productsPopup.deletePopup) {
        setProductsPopup(prev => ({
          ...prev,
          deletePopup: false,
        }));
      }
    };
    
    setMenuPopup(false);
  }

  return (
    <Wrapper variants={settingMenuVariant} initial="init" animate="start" exit="end">
      <MenuList variants={menuListVariant}>
        <MenuItem type="button"
          onClick={() => onClick(0)}
          disabled={productsPopup.updatePopup || productsPopup.deletePopup}>
          <FontAwesomeIcon icon={faFileCirclePlus} /> {'카테고리 변경'}</MenuItem>
        <MenuItem type="button"
          onClick={() => onClick(1)}
          disabled={productsPopup.updatePopup || productsPopup.deletePopup}>
          <FontAwesomeIcon icon={faFileCircleMinus} /> {'카테고리 삭제'}</MenuItem>
        <MenuItem type="button"
          onClick={() => onClick(2)}
          disabled={productsPopup.updatePopup || productsPopup.deletePopup}>
          <FontAwesomeIcon icon={faFolderPlus} /> {'품목 신규 추가'}</MenuItem>
        <MenuItem type="button"
          onClick={() => onClick(3)}
          disabled={productsPopup.deletePopup}>
          <FontAwesomeIcon icon={faFolderOpen} /> {'품목 목록 변경'}</MenuItem>
        <MenuItem type="button"
          onClick={() => onClick(4)}
          disabled={productsPopup.updatePopup}>
          <FontAwesomeIcon icon={faFolderMinus} /> {'품목 목록 삭제'}</MenuItem>
      </MenuList>
    </Wrapper>
  )
}

export default SettingMenu;

const settingMenuVariant = {
  init: {
    width: 0,
    height: 0,
  },
  start: {
    width: 'auto',
    height: 'auto',
    transition: {
      type: 'tween',
      delayChildren: 0.3,
    }
  },
}

const menuListVariant = {
  init: {
    opacity: 0,
  },
  start: {
    opacity: 1,
  },
}

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 46px;
  right: 0;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  overflow: hidden;
  z-index: 1;

  @media ${media.pc_s} {
    top: 49px;
  }
`;

const MenuList = styled(motion.div)`
  ${includes.flexBox()}
  flex-direction: column;
  padding: 11px;
`;

const MenuItem = styled.button`
  ${buttonStyle.outline}
  width: 200px;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;
