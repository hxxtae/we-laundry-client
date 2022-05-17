import styled from 'styled-components';
import { includes } from '../styles';

function NotFoundPage() {
  return (
    <Section>
      <Wrapper>
        NotFound
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
  color: red;
`;
