import { motion } from 'framer-motion';
import styled from 'styled-components';

import { includes } from '../../styles';

function LoadingLogo() {
  return (
    <LoadingBox>
      <Logo src='./assets/svg/welaundry_medium_v2_darkblue.svg' alt='Welaundry'></Logo>
    </LoadingBox>
  )
}

export default LoadingLogo;

const LoadingBox = styled(motion.div)`
  ${includes.flexBox()}
  flex-direction: column;
  width: 300px;
  height: 130px;
  padding: 20px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;