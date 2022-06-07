import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { includes } from '../styles';

function LoadingItem() {
  return (
    <Loading animate={{rotate: 360}} transition={{repeatType: "loop", repeat: Infinity, duration: 1}} >
      <FontAwesomeIcon icon={faSpinner} size="2x" />
    </Loading>
  )
};

export default LoadingItem;

const Loading = styled(motion.div)`
  ${includes.flexBox()}
  color: ${(props) => props.theme.textColor};
  margin: 10px 0;
`;
