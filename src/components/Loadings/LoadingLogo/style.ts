import { motion } from 'framer-motion';
import styled from 'styled-components';

import { includes, media } from '../../../styles';

export const Box = styled(motion.div)`
  position: relative;
  ${includes.flexBox()}
  flex-direction: column;
  width: 300px;
  height: 130px;
  padding: 20px;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Message = styled.p`
  position: absolute;
  bottom: -20px;
  color: ${({ theme }) => theme.borderColorSub};
  font-size: 14px;
  font-weight: 600;
  animation-name: opacityAnimate;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-duration: 1.2s;
  animation-delay: 3s;
  opacity: 0;

  @media ${media.pc_s} {
    font-size: 16px;
  }

  @keyframes opacityAnimate {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;