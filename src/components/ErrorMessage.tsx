import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { colors, includes } from '../styles';

interface IErrorMessage {
  absolute?: boolean;
  message: string | undefined;
}

function ErrorMessage({ absolute = false, message }: IErrorMessage) {
  return (
    <ErrorBox >
      {!!message &&
        <Wrapper pos={absolute.toString()}>
          <FontAwesomeIcon icon={faCircleExclamation} />
          <Message >{message}</Message>
        </Wrapper>}
    </ErrorBox>
  )
}

export default ErrorMessage;


const ErrorBox = styled.div`
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div<{ pos: string }>`
  position: ${(props) => props.pos === 'true' ? 'absolute' : 'static'};
  top: 5px;
  ${includes.flexBox('center', 'flex-start')}
  color: ${colors.red};

  svg {
    margin-left: 5px;
    margin-right: 10px;
  }
`;

const Message = styled.span`
  font-size: 12px;
`;