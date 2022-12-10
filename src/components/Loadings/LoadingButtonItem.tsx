import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { colors } from '../../styles';

function LoadingButtonItem() {
  return (
    <Loading animate={{rotate: 360}} transition={{repeatType: "loop", repeat: Infinity, duration: 1}} >
      <FontAwesomeIcon icon={faSpinner} />
    </Loading>
  )
}

export default LoadingButtonItem;

const Loading = styled(motion.div)`
  display: inline-block;
  color: ${colors.light};
  margin-right: 5px;
`;
