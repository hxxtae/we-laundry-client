import styled from 'styled-components';

interface IErrorMessage {
  message: string | undefined;
}

function ErrorMessage({ message }: IErrorMessage) {
  return (
    <ErrorBox>
      <Message>{message}</Message>
    </ErrorBox>
  )
}

export default ErrorMessage;


const ErrorBox = styled.div`
  
`;

const Message = styled.span`
  font-size: 12px;
  color: red;
`;