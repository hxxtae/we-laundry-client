import { motion } from 'framer-motion';
import styled from 'styled-components';

import { buttonStyle, colors, includes, media } from '../../styles';

interface ILineSec {
  tabletDeg: string;
  pcDeg: string;
}

interface ILineThi {
  tabletX: string;
  tabletY: string;
  pcX: string;
  pcY: string;
}

interface IDescriptionBox {
  lineSec: ILineSec;
  lineThi: ILineThi;
  prev: () => void;
  next: () => void;
  text: string;
}

function DescriptionBox({ lineSec, lineThi, prev, next, text }: IDescriptionBox) {

  return (
    <Wrapper layoutId='desc' >
      <Point />
      <Line />
      <LineSec { ...lineSec } />
      <LineThi { ...lineThi } >
        <Desc>
          <Text>
            {text}
          </Text>
          <Group>
            <Prev type='button' onClick={prev}>{'이전'}</Prev>
            <Next type='button' onClick={next}>{'다음'}</Next>
          </Group>
        </Desc>
      </LineThi>
    </Wrapper>
  )
}

export default DescriptionBox;

const Wrapper = styled(motion.div)`
  position: absolute;
  ${includes.flexBox('center', 'flex-start')}
`;

const Point = styled.div`
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${colors.white};
  box-shadow: 0 0 10px 2px ${(props) => props.theme.textColor};
`;

const Line = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 1px;
  border: 1px solid ${colors.white};
  border-radius: 10px;

  @media ${media.pc_s} {
    width: 100px;
  }
`;

const LineSec = styled.div<ILineSec>`
  flex-shrink: 0;
  width: 74px;
  height: 1px;
  border: 1px solid ${colors.white};
  border-radius: 10px;
  transform-origin: center left;
  transform: rotate(${(props) => props.tabletDeg});

  @media ${media.pc_s} {
    width: 90px;
    transform: rotate(${(props) => props.pcDeg});
  }
`;

const LineThi = styled.div<ILineThi>`
  position: relative;
  flex-shrink: 0;
  width: 50px;
  height: 1px;
  border: 1px solid ${colors.white};
  border-radius: 10px;
  transform:
    translateX(${(props) => props.tabletX})
    translateY(${(props) => props.tabletY});
  
  @media ${media.pc_s} {
    transform:
    translateX(${(props) => props.pcX})
    translateY(${(props) => props.pcY});
  }
`;

const Desc = styled.div`
  position: absolute;
  ${includes.flexBox('flex-start', 'center')}
  flex-direction: column;
  width: 270px;
  border-radius: 10px;
  padding: 15px;
  background-color: ${(props) => props.theme.sameColor};
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .4);
  transform: 
    translateX(30px)
    translateY(-17px);
`;

const Text = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.textColor};
  letter-spacing: .5px;
  line-height: 20px;
`;

const Group = styled.div`
  ${includes.flexBox()}
  align-self: flex-end;
`;

const Prev = styled.button`
  ${buttonStyle.outline()}
  width: 60px;
  margin-right: 10px;
`;

const Next = styled.button`
  ${buttonStyle.primary()}
  width: 60px;
`;