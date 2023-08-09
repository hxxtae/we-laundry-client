import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { memo } from 'react';
import styled from 'styled-components';

import { colors, includes, media } from '../../styles';

interface IItem {
  path: string;
  clickState: boolean;
  name: string;
  children: JSX.Element;
}

function SidebarItem({ children, clickState, path, name }: IItem) {
  const history = useHistory();

  return (
    <Item clicked={clickState+""} path={path} onClick={() => history.push(path)}>
      {children}
      <ItemTitle>{name}</ItemTitle>
      {clickState ?
        <ItemChk key={path} layoutId='side' />
        : null
      }
    </Item>
  );
}

export default memo(SidebarItem, (prev, next) => prev.clickState === next.clickState);
// props.children은 react.memo() 를 사용하여도 리렌더링이 수행되기 때문에, memo의 두 번째 파리미터에
// props의 값을 비교하여 false인 경우에 리렌더링 되도록 propsAreEqual callback 함수를 사용하였습니다.

const Item = styled(motion.li)<{clicked: string, path: string}>`
  position: relative;
  ${includes.flexBox()}
  width: 100%;
  padding: 16px;
  font-size: 12px;
  color: ${colors.white};
  opacity: ${(props) => props.clicked === 'true' ? 1 : .6 };
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
