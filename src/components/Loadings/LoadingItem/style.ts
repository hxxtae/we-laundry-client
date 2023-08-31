import { motion } from 'framer-motion';
import styled from 'styled-components';

import { includes } from '../../../styles';

export const Wrapper = styled.div<{ inline: string }>`
  ${includes.flexBox()}
  display: ${({ inline }) => inline === 'true' ? 'inline-flex' : 'flex'};
  margin: 0 10px;
`;

export const Loading = styled(motion.div)`
  display: inline-block;
  color: ${(props) => props.theme.textColor};
`;