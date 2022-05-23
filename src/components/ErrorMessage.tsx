import styled from 'styled-components';

interface IErrorMessage {
  absolute?: boolean;
  message: string | undefined;
}

function ErrorMessage({ absolute = false, message }: IErrorMessage) {
  return (
    <ErrorBox >
      <Message pos={absolute.toString()}>{message}</Message>
    </ErrorBox>
  )
}

export default ErrorMessage;


const ErrorBox = styled.div`
  position: relative;
  width: 100%;
`;

const Message = styled.span<{ pos: string }>`
  position: ${(props) => props.pos === 'true' ? 'absolute' : 'static'};
  top: 5px;
  font-size: 12px;
  color: red;
`;