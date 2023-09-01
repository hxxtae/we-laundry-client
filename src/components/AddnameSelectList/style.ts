import { motion } from 'framer-motion';
import styled from 'styled-components';

import { scroll, selectStyle } from '../../styles';

// NOTE: motion effect object
export const motionSelect = {
  init: {
    height: 0,
  },
  start: {
    height: "auto",
    transition: {
      type: 'tween',
    }
  },
  end: {
    height: 0,
    opacity: 0,
    border: 0,
  }
}

export const SelectBox = styled(motion.ul)`
  ${selectStyle.select(40)}
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  ${({ theme }) => scroll.custom(8, theme.borderColorSub, theme.textColor)}
`;

export const SelectItem = styled(motion.li) <{ chk: string }>`
  ${selectStyle.option()}
  background-color: ${({ theme, chk }) => chk === 'true' ? theme.borderColor : 'transparent' };
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: ${(props) => props.theme.borderColor};
  }
`;