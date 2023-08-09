import { useRouteMatch } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import styled from 'styled-components';

import { openState, sidebarClickState } from '../../../global/atoms';
import { buttonStyle, colors, dragging, includes, media } from '../../../styles';
import { openStorage } from '../../../util';

function OpenAndClose() {
  const [open, setOpen] = useRecoilState(openState);
  const setSideClick = useSetRecoilState(sidebarClickState);
  const { path } = useRouteMatch();
  
  useEffect(() => {
    setSideClick(path);
  }, [path, setSideClick]);

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
      <Wrapper>
        <Contents>
          우리동네 세탁소 맞춤 포스 <br/>
          <strong>welaundry</strong> 하나면 충분해요.
        </Contents>
        <Button state={open.toString()} onClick={onClick} type='button' >{open ? '영업 마감하기' : '영업 시작하기'}</Button>
      </Wrapper>
      <Image src="/assets/img/tablet.png" alt="welaundry logo image" />
    </Group>
  );
}

export default OpenAndClose;

const Group = styled.div`
  ${dragging.stop}
  ${includes.flexBox()}
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: ${colors.lightUp};

  @media ${media.pc_s} {
    gap: 80px;
  }

  @media ${media.pc_l} {
    gap: 160px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Contents = styled.p`
  font-size: 24px;
  line-height: 1.8;

  strong {
    font-weight: 600;
  }
`;

const Button = styled.button<{state: string}>`
  ${(props) => props.state === 'true' ? `${buttonStyle.close()}` : `${buttonStyle.open()}` }
  padding: 12px 8px;
  border: transparent;
  border-radius: 7px;
  margin-right: 20%;
`;

const Image = styled.img`
  width: 390px;

  @media ${media.pc_s} {
    width: 410px;
  }

  @media ${media.pc_l} {
    width: 510px;
    content: url("/assets/img/desktop.png");
  }
`;
