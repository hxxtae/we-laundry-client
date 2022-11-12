import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors, includes, media } from '../styles';

function NotFoundPage() {
  return (
    <Section>
      <Wrapper>
        <StatusNum>404</StatusNum>
        <DescBox>
          <Title><FontAwesomeIcon icon={faWarning} style={{ color: colors.red}} /> Oops! Page not found.</Title>
          <Desc>페이지를 찾을 수 없습니다.</Desc>
          <Desc>포스 <Link to={'/'} style={{ color: colors.blue }}>메인 페이지</Link>로 돌아가거나 welaundry에 문의해 주세요.</Desc>
        </DescBox>
      </Wrapper>
    </Section>
  )
}

export default NotFoundPage;

const Section = styled.section`
  ${includes.flexBox()};
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  ${includes.flexBox()};
  margin-bottom: 100px;
`;

const StatusNum = styled.h1`
  color: ${colors.red};
  font-size: 70px;
  font-weight: 600;

  @media ${media.pc_s} {
    font-size: 90px;
  }
`;

const DescBox = styled.div`
  ${includes.flexBox('flex-start', 'space-between')};
  flex-direction: column;
  padding-left: 10px;
  gap: 14px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor};
  font-size: 20px;
  font-weight: 500;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 12px;
`;
