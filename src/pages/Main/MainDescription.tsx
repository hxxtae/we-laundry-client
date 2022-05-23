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
} from '../../styles';
import { descState } from '../../global/atoms';
import DescriptionBox from './DescriptionBox';
import { mainDescStorage } from '../../util';

function MainDescription() {
  console.log('Description');

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
    <DescList>
      {descStep === 0 ?
        <DescriptionBox
          posit={linePosition.posit_1}
          lineSec={lineSecLocation.Top}
          lineThi={lineThiLocation.Top}
          prev={onPrev}
          next={onNext}
          text={descText.text1} />
        :
        descStep === 1 ? 
          <DescriptionBox
            posit={linePosition.posit_2}
            lineSec={lineSecLocation.Middle}
            lineThi={lineThiLocation.Middle}
            prev={onPrev}
            next={onNext}
            text={descText.text2} />
          :
          descStep === 2 ? 
            <DescriptionBox
              posit={linePosition.posit_3}
              lineSec={lineSecLocation.Top}
              lineThi={lineThiLocation.Top}
              prev={onPrev}
              next={onNext}
              text={descText.text3} />
            :
            descStep === 3 ? 
              <DescriptionBox
                posit={linePosition.posit_4}
                lineSec={lineSecLocation.Middle}
                lineThi={lineThiLocation.Middle}
                prev={onPrev}
                next={onNext}
                text={descText.text4} />
              :
              descStep === 4 ?
                <DescriptionBox
                  posit={linePosition.posit_5}
                  lineSec={lineSecLocation.Bottom}
                  lineThi={lineThiLocation.Bottom}
                  prev={onPrev}
                  next={onNext}
                  text={descText.text5} />
                :
                <DescriptionBox
                  posit={linePosition.posit_6}
                  lineSec={lineSecLocation.Bottom}
                  lineThi={lineThiLocation.Bottom}
                  prev={onPrev}
                  next={onNext}
                  text={descText.text6} />
      }
    </DescList>
  );
}

export default MainDescription;

const DescList = styled.div`
  position: absolute;
  left: ${sidebarWidth.tablet};
  z-index: 20;

  @media ${media.pc_s} {
    left: ${sidebarWidth.pc};
  }
`;
