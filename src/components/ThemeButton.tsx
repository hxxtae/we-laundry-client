import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
  
import { colors, dragging, includes, zIndexes } from '../styles';
import { themeState } from '../global/atoms';
import { themeStorage } from '../util';

function ThemeButton() {
  const [theme, setTheme] = useRecoilState(themeState);
  const onClick = () => {
    setTheme((prev) => {
      if (prev) {
        themeStorage.remove();
        return !prev;
      }
      themeStorage.set();
      return !prev;
    });
  }

  return (
    <Box>
      <AnimatePresence>
        <ToggleButton type='button' onClick={onClick}>
            <Wrapper>
            {!theme ?
              <Circle key='dark' layoutId='theme' /> :
              <Text
                variants={textVariants}
                initial='init'
                animate='start'
                exit='end'
              >{'Light'}</Text>}
            </Wrapper>
            <Wrapper>
            {theme ?
              <Circle key='light' layoutId='theme' /> :
              <Text
                variants={textVariants}
                initial='init'
                animate='start'
                exit='end'
              >{'Dark'}</Text>}
            </Wrapper>
          </ToggleButton>
      </AnimatePresence>
    </Box>
  )
}

export default ThemeButton;

const textVariants = {
  init: {
    opacity: 0,
  },
  start: {
    opacity: 1,
  },
  end: {
    opacity: 0
  }
}

const Box = styled(motion.div)`
  ${dragging.stop}
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 90px;
  height: 50px;
  padding: 5px;
  background-color: transparent;
  z-index: ${zIndexes.themeButton};
`;

const ToggleButton = styled(motion.button)`
  ${includes.flexBox()}
  width: 100%;
  height: 100%;
  background-color: ${colors.borderLight};
  border-radius: 20px;
  box-shadow: 0 0 20px ${(props) => props.theme.textColor};
  overflow: hidden;
  cursor: pointer;
`;

const Wrapper = styled.div`
  ${includes.flexBox()}
  width: 100%;
`;

const Circle = styled(motion.div)`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
`;

const Text = styled(motion.span)`
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 0 10px #000000;
  letter-spacing: .1px;
  color: ${(props) => props.theme.textColor};
`;
