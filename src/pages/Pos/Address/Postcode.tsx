import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

import { buttonStyle } from '../../../styles';

interface IPostcode {
  setClose: (props: boolean) => void;
  setData: (data: string) => void;
}

function Postcode({ setClose, setData }: IPostcode) {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setClose(false);
    setData(fullAddress);
    console.log(fullAddress);
  }

  const onClose = () => {
    setClose(false);
  }

  return (
    <Box>
      <DaumPostcode onComplete={handleComplete} />
      <Button type='button' onClick={onClose}>닫기</Button>
    </Box>
  );
}

export default Postcode;

const Box = styled.div`
  position: relative;
  width: 400px;
`;

const Button = styled.button`
  position: absolute;
  bottom: -35px;
  ${buttonStyle.primary()}
  width: 100%;
  margin-top: 5px;
`;
