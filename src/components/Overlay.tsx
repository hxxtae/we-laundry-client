import { motion } from 'framer-motion';
import styled from 'styled-components';
import { includes, zIndexes } from '../styles';

interface IOverlay {
  transparentChk?: boolean;
  children?: JSX.Element;
}

function Overlay({ transparentChk = false, children }: IOverlay) {
  return (
    <Overbackground chk={transparentChk.toString()}>
      <Wrapper>
        {children || null}
      </Wrapper>
    </Overbackground>
  );
}

export default Overlay;

const Overbackground = styled(motion.div)<{chk: string}>`
  position: fixed;
  top: 0;
  left: 0;
  ${includes.flexBox()};
  background-color: ${(props) => props.chk === 'true' ? 'transparent' : `rgba(0, 0, 0, .4)` };
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.overlay};
`;

const Wrapper = styled(motion.div)`
  
`;