import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';
import '@fortawesome/fontawesome-svg-core';

import * as S from './style';

interface ILoadingComponent {
  loadingMessage: string;
}

function LoadingComponent({ loadingMessage }: ILoadingComponent) {
  return (
    <AnimatePresence>
      <S.Box>
        <S.Loading animate={{rotate: 360}} transition={{repeatType: "loop", repeat: Infinity, duration: 1}} >
          <FontAwesomeIcon icon={faSpinner} size="2x" />
        </S.Loading>
        <S.Message>
          {loadingMessage}
        </S.Message>
      </S.Box>
    </AnimatePresence>
  );
}

export default LoadingComponent;
