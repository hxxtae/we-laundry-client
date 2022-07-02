import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  lineSecLocation,
  lineThiLocation,
  media,
  linePosition,
  descText,
  sidebarWidth,
  zIndexes,
} from '../../styles';
import { descState } from '../../global/atoms';
import DescriptionBox from './DescriptionBox';
import { mainDescStorage } from '../../util';
import { AnimatePresence } from 'framer-motion';

interface IPos {
  tabletPos: string;
  pcPos: string;
}

function MainDescription() {
  const [descStep, setDescStep] = useState(0);
  const setDescState = useSetRecoilState(descState);

  const onPrev = () => {
    if (descStep <= 0) {
      return;
    }
    setDescStep((prev) => prev - 1);
  }

  const onNext = () => {
    setDescStep((prev) => prev + 1);
    if (descStep >= 5) {
      setDescState(false);
      mainDescStorage.remove();
    }
  }

  return (
    <AnimatePresence>
      <DescList descStep={descStep}>
        {descStep === 0 ?
          <DescriptionBox
            lineSec={lineSecLocation.Top}
            lineThi={lineThiLocation.Top}
            prev={onPrev}
            next={onNext}
            text={descText.text1} />
          :
          descStep === 1 ? 
            <DescriptionBox
              lineSec={lineSecLocation.Middle}
              lineThi={lineThiLocation.Middle}
              prev={onPrev}
              next={onNext}
              text={descText.text2} />
            :
            descStep === 2 ? 
              <DescriptionBox
                lineSec={lineSecLocation.Top}
                lineThi={lineThiLocation.Top}
                prev={onPrev}
                next={onNext}
                text={descText.text3} />
              :
              descStep === 3 ? 
                <DescriptionBox
                  lineSec={lineSecLocation.Middle}
                  lineThi={lineThiLocation.Middle}
                  prev={onPrev}
                  next={onNext}
                  text={descText.text4} />
                :
                descStep === 4 ?
                  <DescriptionBox
                    lineSec={lineSecLocation.Bottom}
                    lineThi={lineThiLocation.Bottom}
                    prev={onPrev}
                    next={onNext}
                    text={descText.text5} />
                  :
                  <DescriptionBox
                    lineSec={lineSecLocation.Bottom}
                    lineThi={lineThiLocation.Bottom}
                    prev={onPrev}
                    next={onNext}
                    text={descText.text6} />
          }
      </DescList>
    </AnimatePresence>
  );
}

export default MainDescription;

const DescList = styled.div<{descStep: number}>`
  position: absolute;
  top: ${({ descStep }) => linePosition[descStep].tabletPos};
  left: ${sidebarWidth.tablet};
  z-index: ${zIndexes.overlayContext};

  @media ${media.pc_s} {
    top: ${({ descStep }) => linePosition[descStep].pcPos};
    left: ${sidebarWidth.pc};
  }
`;
