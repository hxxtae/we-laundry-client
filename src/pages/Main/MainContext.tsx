import { LayoutGroup, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { descState } from '../../global/atoms';
import { headerHeight, includes, media } from '../../styles';
import { Background, Containers, Overlay } from '../../components';
import Header from './Header';
import Sidebar from './Sidebar';
import MainDescription from './MainDescription';

interface IMainContext {
  children: JSX.Element;
}

function MainContext({ children }: IMainContext) {
  console.log("MainContext");

  const desc = useRecoilValue(descState);

  return (
    <>
      <Background>
        <Containers>
          <Wrapper>
            <Header />
            <Group>
              <LayoutGroup>
                <Sidebar />
                <Context >
                  {desc ? <MainDescription /> : children}
                </Context>
              </LayoutGroup>
            </Group>
          </Wrapper>
        </Containers>
      </Background>
      {desc ? <Overlay /> : null}
    </>
  )
}

export default MainContext;

const Wrapper = styled.div`
  height: 100vh;
`;

const Group = styled.main`
  ${includes.flexBox('flex-start', 'flex-start')}
  height: calc(100vh - ${headerHeight.tablet});

  @media ${media.pc_s} {
    height: calc(100vh - ${headerHeight.pc});
  }
`;

const Context = styled(motion.div)`
  flex-grow: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.bgColorThi};
  transition: background-color 200ms ease-in-out;
`;


