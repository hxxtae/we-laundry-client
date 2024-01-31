import styled from 'styled-components';

export const Section = styled.section`
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 200ms ease-in-out;
`;