import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { includes, media } from '../../styles';
import { Background, Containers } from '../../components';

interface ILoginContext {
  children: JSX.Element;
}

function LoginContext({ children }: ILoginContext) {
  console.log('LoginImg');

  const [imgPaths] = useState([
    './assets/img/img_login.jpg',
    './assets/img/img_login3.jpg',
  ]);

  const [next, setNext] = useState(0);
  let opcityStart: React.MutableRefObject<any> = useRef(null);

  useEffect(() => {
    opcityStart.current = setInterval(() => setNext((prev) => {
      if (prev === imgPaths.length - 1) {
        return 0;
      }
      return prev + 1;
    }), 10000);
    return () => clearInterval(opcityStart.current);
  }, [imgPaths]);

  return (
    <Background>
      <Containers>
        <AnimatePresence>
          <Section>
            <Wrapper>
              <ImgBox>
                {
                  imgPaths
                    .map((path, index) => (next === index) &&
                      (<Img
                        key={index}
                        src={path}
                        variants={opacityVariants}
                        initial="init"
                        animate="begin"
                        exit="end"
                      />))
                }
              </ImgBox>
              {children}
            </Wrapper>
          </Section>
        </AnimatePresence>
      </Containers>
    </Background>
  );
}

export default LoginContext;

const opacityVariants = {
  init: {
    opacity: 0,
  },
  begin: {
    opacity: 1,
    transition: {
      duration: 2,
    }
  },
  end: {
    opacity: 0,
    transition: {
      duration: 2,
    }
  }
}

const Section = styled.section`
  position: relative;
  height: 100vh;
  ${includes.flexBox()}
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  overflow: hidden;
  transition: border-color 200ms ease-in-out;

  @media ${media.pc_s} {
    border-radius: 8px;
  }
`;

const ImgBox = styled(motion.div)`
  width: 100%;
  height: 500px;

  @media ${media.tablet_s} {
    height: 700px;
  }
`;

const Img = styled(motion.img)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;