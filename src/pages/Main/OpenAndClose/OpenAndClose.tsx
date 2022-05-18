import { useRouteMatch } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import styled from 'styled-components';

import { openState, sidebarClickState } from '../../../global/atoms';
import { buttonStyle, includes } from '../../../styles';
import { openStorage } from '../../../util';

function OpenAndClose() {
  console.log('Introduce');

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
      <Title>
        <Logo src={'./assets/svg/welaundry_small.svg'}></Logo>
      </Title>
      <StartButton state={open.toString()} onClick={onClick} type='button'>{open ? '영업 마감하기' : '영업 시작하기'}</StartButton>
    </Group>
  );
}

export default OpenAndClose;

const Group = styled.div`
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

const Title = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  width: 300px;
  margin-bottom: 50px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StartButton = styled.button<{state: string}>`
  ${(props) => props.state === 'true' ? `${buttonStyle.close()}` : `${buttonStyle.outline()}` }
  border: transparent;
  margin-bottom: 100px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
`;
