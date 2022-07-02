import { useRouteMatch } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import styled from 'styled-components';

import { openState, sidebarClickState } from '../../../global/atoms';
import { buttonStyle, dragging, includes, media } from '../../../styles';
import { openStorage } from '../../../util';

function OpenAndClose() {
  const [open, setOpen] = useRecoilState(openState);
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, []);

  const onClick = () => {
    if (open) {
      openStorage.remove();
    } else {
      openStorage.set();
    }
    setOpen((prev) => !prev);
  }

  return (
    <Group>
      <LogoBox>
        <Logo src={'./assets/svg/welaundry_medium_v2_darkblue.svg'} />
      </LogoBox>
      <StartButton state={open.toString()} onClick={onClick} type='button'>{open ? '영업 마감하기' : '영업 시작하기'}</StartButton>
    </Group>
  );
}

export default OpenAndClose;

const Group = styled.div`
  ${dragging.stop}
  ${includes.flexBox()}
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-image: linear-gradient(rgba(200, 200, 200, 0), rgba(200, 200, 200, .8)), url(./assets/img/introduce_1.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const LogoBox = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  width: 300px;
  margin-bottom: 50px;

  @media ${media.pc_s} {
    width: 400px;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StartButton = styled.button<{state: string}>`
  ${(props) => props.state === 'true' ? `${buttonStyle.close()}` : `${buttonStyle.open()}` }
  border: transparent;
  margin-bottom: 100px;
`;
