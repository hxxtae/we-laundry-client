import { faReceipt, faAddressBook, faShirt, faBuilding, faChartColumn, faPowerOff, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

import { colors, dragging, includes } from '../../styles';
import { sidebarClickState, sidebarState } from '../../global/atoms';
import { pathStr } from '../../routers/path';
import SidebarItem from './SidebarItem';

function Sidebar() {
  const sideToggle = useRecoilValue(sidebarState);
  const sideClick = useRecoilValue(sidebarClickState);

  return (
    <AnimatePresence>
      {sideToggle ? (
        <Nav variants={navVariant} initial="init" animate="start" exit="end">
          <List variants={listVariant}>
            <SidebarItem path={pathStr('records')} name='주문접수' click={sideClick} >
              <FontAwesomeIcon icon={faReceipt} size="2x" />
            </SidebarItem>
            <SidebarItem path={pathStr('history')} name='주문내역' click={sideClick} >
              <FontAwesomeIcon icon={faClipboardList} size="2x" />
            </SidebarItem>
            <SidebarItem path={pathStr('customer')} name='고객관리' click={sideClick} >
              <FontAwesomeIcon icon={faAddressBook} size="2x" />
            </SidebarItem>
            <SidebarItem path={pathStr('products')} name='품목관리' click={sideClick} >
              <FontAwesomeIcon icon={faShirt} size="2x" />
            </SidebarItem>
            <SidebarItem path={pathStr('address')} name='주소관리' click={sideClick} >
              <FontAwesomeIcon icon={faBuilding} size="2x" />
            </SidebarItem>
            <SidebarItem path={pathStr('sales')} name='매출관리' click={sideClick} >
              <FontAwesomeIcon icon={faChartColumn} size="2x" />
            </SidebarItem>
            <SidebarItem path={pathStr('pos')} name='영업관리' click={sideClick} >
              <FontAwesomeIcon icon={faPowerOff} size="2x" />
            </SidebarItem>
          </List>
        </Nav>) : null}
    </AnimatePresence>
  )
}

export default Sidebar;

const navVariant = {
  init: {
    width: 0,
  },
  start: {
    width: "auto",
    transition: {
      delayChildren: 0.5,
    }
  },
  end: {
    width: 0,
    transition: {
      delay: 0.5,
    }
  }
}

const listVariant = {
  init: {
    opacity: 0,
  },
  start: {
    opacity: 1,
  },
  end: {
    opacity: 0,
  }
}

const Nav = styled(motion.nav)`
  ${dragging.stop}
  height: 100%;
  background-color: ${colors.darkSlateSub};
  transition: background-color 200ms ease-in-out;
`;

const List = styled(motion.ul)`
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
`;

