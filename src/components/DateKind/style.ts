import { motion } from 'framer-motion';
import styled from 'styled-components';

import { includes, inputStyle, scroll, selectStyle } from '../../styles';

// NOTE: motion effect object
export const selectVariant = {
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

export const Wrapper = styled.div`
  position: relative;
`;

export const DateValue = styled.strong`
  ${inputStyle.base()}
  ${includes.flexBox()}
  padding: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.inputColor};
  border-color: ${({ theme }) => theme.borderColor };
  min-width: 80px;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;

export const DateSelect = styled(motion.ul)`
  ${selectStyle.select(40)}
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  ${({ theme }) => scroll.custom(8, theme.borderColorSub, theme.textColor)}
`;

export const DateOption = styled(motion.li)<{ chk: string }>`
  ${selectStyle.option()}
  background-color: ${({ theme, chk }) => chk === 'true' ? theme.borderColor : 'transparent' };
  color: ${({ theme }) => theme.textColor};
  &:hover {
    background-color: ${({ theme }) => theme.borderColor};
  }
`;