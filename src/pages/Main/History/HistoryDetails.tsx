import styled from 'styled-components';
import { includes } from '../../../styles';

function HistoryDetails() {
  return (
    <Wrapper>
      Detail
    </Wrapper>
  )
}

export default HistoryDetails;

const Wrapper = styled.section`
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  flex-grow: 1;
  border-left: 1px solid ${(props) => props.theme.borderColor};
`;
