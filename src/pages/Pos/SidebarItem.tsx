import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { colors, includes, media } from '../../styles';

interface IItem {
  path: string;
  click: string;
  name: string;
  children: JSX.Element;
}

function SidebarItem({ children, click, path, name }: IItem) {
  const history = useHistory();

  return (
    <Item clicked={click} path={path} onClick={() => history.push(path)}>
      {children}
      <ItemTitle>{name}</ItemTitle>
      {click === path ?
        <ItemChk key={path} layoutId='side' />
        : null
      }
    </Item>
  );
}

export default SidebarItem;

const Item = styled(motion.li)<{clicked: string, path: string}>`
  position: relative;
  ${includes.flexBox()}
  width: 100%;
  padding: 16px;
  font-size: 12px;
  color: ${colors.white};
  opacity: ${(props) => props.clicked === `${props.path}` ? 1 : .6 };
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &:nth-child(2),
  &:nth-child(5) {
    margin-bottom: 40px;
  }

  @media ${media.pc_s} {
    font-size: 14px;
    padding: 20px;
  }
`;

const ItemTitle = styled(motion.span)`
  position: absolute;
  bottom: 0;
  color: ${colors.white};
  font-size: 10px;
  font-weight: 600;

  @media ${media.pc_s} {
    font-size: 11px;
  }
`;

const ItemChk = styled(motion.div)`
  position: absolute;
  top: 8px;
  left: 0;
  width: 3px;
  height: 100%;
  border-radius: 4px;
  background-color: white;
  box-shadow: -2px 0 10px 1px rgba(0, 0, 0, .5);
`;
