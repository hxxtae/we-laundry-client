import { motion } from 'framer-motion';
import styled from 'styled-components';

import { includes } from '../../../styles';

export const Box = styled(motion.div)`
  ${includes.flexBox()}
  flex-direction: column;
  width: 250px;
  height: 120px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

export const Loading = styled(motion.div)`
  ${includes.flexBox()}
  color: ${(props) => props.theme.textColor};
`;

export const Message = styled(motion.p)`
  padding-top: 20px;
  color: ${(props) => props.theme.textColor};
`;
