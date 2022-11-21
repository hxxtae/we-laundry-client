import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Background, Containers } from '../../components';
import { colors, includes, media } from '../../styles';
import { pathStr } from '../../routers/path';

function BoardContext() {
  return (
    <Background>
      <Containers>
        <Wrapper>
          <Group>
            <LogoBox>
              <Logo src={process.env.PUBLIC_URL + '/assets/svg/welaundry_medium_v2_darkblue.svg'} />
            </LogoBox>
            <strong>현재 준비중 입니다.</strong>
            <Link to={pathStr('pos')}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
              포스로 돌아가기
            </Link>
          </Group>
        </Wrapper>
      </Containers>
    </Background>
  )
}

export default BoardContext;

const Wrapper = styled.div`
  height: 100vh;
`;

const Group = styled.main`
  ${includes.flexBox()}
  flex-direction: column;
  height: 100%;

  strong {
    color: ${({ theme }) => theme.textColor};
    font-size: 16px;
    padding: 20px 0;

    @media ${media.pc_s} {
      font-size: 24px;
    }
  }

  a {
    padding: 10px;
    color: ${colors.blue};
    font-size: 14px;

    svg {
      margin-right: 4px;
    }
  }
`;

const LogoBox = styled.div`
  ${includes.flexBox('flex-start', 'center')}
  width: 300px;

  @media ${media.pc_s} {
    width: 400px;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
