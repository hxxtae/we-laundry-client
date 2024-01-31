import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core';

import * as S from './style';

type LoadingSize = '1x' | '2x' | '3x';

interface ILoadingItem {
  inline?: boolean;
  size?: LoadingSize;
}

function LoadingItem({ inline = false, size = '1x' }: ILoadingItem) {
  return (
    <S.Wrapper inline={inline.toString()}>
      <S.Loading animate={{rotate: 360}} transition={{repeatType: "loop", repeat: Infinity, duration: 1}} >
        <FontAwesomeIcon icon={faSpinner} size={size} />
      </S.Loading>
    </S.Wrapper>
  )
};

export default LoadingItem;

