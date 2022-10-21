import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useResetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';

import { recordLaundryState, recordReceiptExeState, recordRepairState, recordRequestState } from '../../../../../global';
import { buttonStyle, colors, dragging, includes, media } from '../../../../../styles';
import { useAudio } from '../../../../../hooks';

interface IReceiptSuccess {
  sumLaundry: { price: number, count: number };
  sumRepair: { price: number, count: number };
  setReceiptAct: React.Dispatch<React.SetStateAction<boolean>>;
  setReceiptOkAct: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReceiptSuccess({ sumLaundry, sumRepair, setReceiptAct, setReceiptOkAct }: IReceiptSuccess) {
  const resetLaundry = useResetRecoilState(recordLaundryState);
  const resetRepair = useResetRecoilState(recordRepairState);
  const resetRecord = useResetRecoilState(recordRequestState);
  const resetReceiptExe = useResetRecoilState(recordReceiptExeState);
  const { toggle } = useAudio('./assets/sound/note.mp3');
  const sumTotal = (sumLaundry.price + sumRepair.price).toLocaleString();

  const onExit = () => {
    setReceiptAct(false);
    setReceiptOkAct(false);
    resetReceiptExe();
    
    // request state 초기화
    resetLaundry();
    resetRepair();
    resetRecord();
  }

  useEffect(() => {
    toggle();
  }, []);

  return (
    <Wrapper variants={SuccessVariant} initial="init" animate="start">
      <TitleBox>
        <FontAwesomeIcon icon={faCheck}/>
        <Title>{'접수 완료'}</Title>
        <Desc>{'주문 접수가 완료되었습니다.'}</Desc>
      </TitleBox>
      <DetailList>
        <DetailItem>
          <Text>{'세탁 금액'}</Text>
          <Sum>{`${sumLaundry.price.toLocaleString()}원`}</Sum>
        </DetailItem>
        <DetailItem>
          <Text>{'수선 금액'}</Text>
          <Sum>{`${sumRepair.price.toLocaleString()}원`}</Sum>
        </DetailItem>
        <DetailItem>
          <Text>{'접수 금액'}</Text>
          <Sum>{`${sumTotal}원`}</Sum>
        </DetailItem>
      </DetailList>
      <Exit onClick={onExit}>{'닫기'}</Exit>
    </Wrapper>
  )
}

export default ReceiptSuccess;

const SuccessVariant = {
  init: {
    opacity: 0,
  },
  start: {
    opacity: 1,
  }
}

const Wrapper = styled(motion.section)`
  ${dragging.stop}
  ${includes.flexBox()}
  flex-direction: column;
  width: 350px;
  height: 430px;
  padding: 24px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0 0 30px rgba(0, 0, 0, .3);

  @media ${media.pc_s} {
    width: 400px;
    height: 480px;
  }
`;

const TitleBox = styled.div`
  ${includes.flexBox()}
  flex-direction: column;
  color: ${(props) => props.theme.textColor};

  svg:first-child {
    font-size: 22px;
    color: ${colors.green};
  }

  @media ${media.pc_s} {
    svg:first-child {
    font-size: 24px;
  }
  }
`;

const Title = styled.h2`
  padding: 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.green};

  @media ${media.pc_s} {
    padding: 15px 0;
    font-size: 22px;
  }
`;

const Desc = styled.p`
  font-size: 16px;
  font-weight: 600;

  @media ${media.pc_s} {
    font-size: 18px;
  }
`;

const DetailList = styled.ul`
  flex-grow: 1;
  width: 100%;
  padding: 20px 10px;
`;

const DetailItem = styled.li`
  ${includes.flexBox('center', 'space-between')}
  padding: 5px 0;
  color: ${(props) => props.theme.textColor};
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  opacity: .7;

  @media ${media.pc_s} {
    font-size: 15px;
  }
`;

const Sum = styled.strong`
  font-size: 16px;
  font-weight: 600;
  @media ${media.pc_s} {
    font-size: 18px;
  }
`;

const Exit = styled.button`
  ${buttonStyle.primary()}
  width: 100%;
  height: 40px;

  @media ${media.pc_s} {
    height: 50px;
  }
`;
