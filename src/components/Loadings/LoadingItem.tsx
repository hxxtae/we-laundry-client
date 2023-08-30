import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { includes } from '../../styles';

type LoadingSize = '1x' | '2x' | '3x';

interface ILoadingItem {
  inline?: boolean;
  size?: LoadingSize;
}

function LoadingItem({ inline = false, size = '1x' }: ILoadingItem) {
  return (
    <Wrapper inline={inline.toString()}>
      <Loading animate={{rotate: 360}} transition={{repeatType: "loop", repeat: Infinity, duration: 1}} >
        <FontAwesomeIcon icon={faSpinner} size={size} />
      </Loading>
    </Wrapper>
  )
};

export default LoadingItem;

const Wrapper = styled.div<{ inline: string }>`
  ${includes.flexBox()}
  display: ${({ inline }) => inline === 'true' ? 'inline-flex' : 'flex'};
  margin: 0 10px;
`;

const Loading = styled(motion.div)`
  display: inline-block;
  color: ${(props) => props.theme.textColor};
`;
