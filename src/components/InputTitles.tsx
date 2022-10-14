import styled from 'styled-components';
import { media } from '../styles';
import { colors } from '../styles/constants';

interface IInputTitles {
  title?: string;
  des?: string;
  response?: boolean;
}

function InputTitles({ title, des, response = false }: IInputTitles) {
  return (
    <Wrapper response={response}>
      {title && <Title>{title}</Title>}
      <Des>{des}</Des>
    </Wrapper>
  )
}

export default InputTitles;

const Wrapper = styled.div<{ response: boolean }>`
  padding-bottom: 10px;
  display: ${({ response }) => response ? 'none' : 'block'};

  @media ${media.pc_s} {
    display: block;
  }
`;

const Title = styled.h2`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Des = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: ${colors.secondary};
`;