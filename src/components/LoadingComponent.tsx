import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { includes } from '../styles';

interface ILoadingComponent {
  loadingMessage: string;
}

function LoadingComponent({ loadingMessage }: ILoadingComponent) {
  return (
    <AnimatePresence>
      <LoadingBox>
        <Loading animate={{rotate: 360}} transition={{repeatType: "loop", repeat: Infinity, duration: 1}} >
          <FontAwesomeIcon icon={faSpinner} size="2x" />
        </Loading>
        <LoadingMessage>
          {loadingMessage}
        </LoadingMessage>
      </LoadingBox>
    </AnimatePresence>
  );
}

export default LoadingComponent;

const LoadingBox = styled(motion.div)`
  ${includes.flexBox()}
  flex-direction: column;
  width: 250px;
  height: 120px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

const Loading = styled(motion.div)`
  ${includes.flexBox()}
  color: ${(props) => props.theme.textColor};
`;

const LoadingMessage = styled(motion.p)`
  padding-top: 20px;
  color: ${(props) => props.theme.textColor};
`;
