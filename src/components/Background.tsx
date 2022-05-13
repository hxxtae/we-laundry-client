import styled from 'styled-components';

interface IBackground {
  children: JSX.Element;
}

function Background({ children }: IBackground) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default Background;

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 200ms ease-in-out;
`;
