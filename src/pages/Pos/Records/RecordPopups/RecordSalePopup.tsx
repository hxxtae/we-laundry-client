import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { buttonStyle, colors, includes, inputStyle } from '../../../../styles';
import { recordRequestState } from '../../../../global';
import { KeyboardBox } from '../../../../components';
import { useSetRecoilState } from 'recoil';


interface IRecordSalePopup {
  totalPay: { price: number, count: number };
  prevSale: number;
  onClose: () => void;
}

function RecordSalePopup({ totalPay, prevSale, onClose }: IRecordSalePopup) {
  const [saleInput, setSaleInput] = useState(prevSale);
  const [saleKind, setSaleKind] = useState<'price' | 'rate'>('price');
  const [salePrice, setSalePrice] = useState(0);
  const setRecordState = useSetRecoilState(recordRequestState);

  const onSetValue = (key: string, value: string) => {
    let inputValue = +value;
    
    // '금액'으로 할인
    if (saleKind === 'price') {
      setSaleInput(() => inputValue);
      setSalePrice(() => inputValue);
      return;
    }

    // '비율'로 할인
    if (saleKind === 'rate') {
      const price = Math.round((totalPay.price * inputValue) / 100);
      setSaleInput(() => inputValue);
      setSalePrice(() => price);
      return;
    }
  }

  const onMaxNumWithKind = (): number => {
    return saleKind === 'price' ? totalPay.price : 100;
  }

  const onKindChoiceState = (kind: string, state: string) => {
    return (kind === state).toString();
  }

  const onKindClick = (kind: string) => {
    setSaleKind((prev) => {
      if (prev === 'rate') return 'price';
      return 'rate';
    });
  }

  const onApplyOfSale = () => {
    setRecordState((prevRecord) => ({
      ...prevRecord,
      recordSale: salePrice,
      recordSalePrice: salePrice ? (totalPay.price - salePrice) : 0,
    }));
    onClose();
  }

  useEffect(() => {
    setSaleInput(0);
    setSalePrice(0);
  }, [saleKind]);

  useEffect(() => {
    onSetValue('recordSale', prevSale.toString());
  }, []);

  return (
    <Section>
      <Header>
        <span>할인</span>
        <Close type='button' onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </Close>
      </Header>

      <Main>
        <SaleBox>
          <SaleTotal>
            <span>결제 금액</span>
            <strong>{totalPay.price.toLocaleString()}원</strong>
          </SaleTotal>
          <SalePay>
            <SaleInput
              type='number'
              readOnly
              autoComplete='off'
              value={saleInput}
            />
            <SalePayKind>
              <KindButton
                type='button'
                kind={onKindChoiceState('rate', saleKind)}
                onClick={() => onKindClick(saleKind)}
              >%</KindButton>
              <KindButton
                type='button'
                kind={onKindChoiceState('price', saleKind)}
                onClick={() => onKindClick(saleKind)}
              >원</KindButton>
            </SalePayKind>
          </SalePay>
          <SaleResult>
            <Wrapper>
              <span>할인 금액</span>
              <strong>{salePrice.toLocaleString()}원</strong>
            </Wrapper>
            <Confirm type='button' onClick={onApplyOfSale}>적용</Confirm>
          </SaleResult>
        </SaleBox>

        <KeyBox>
          <KeyboardBox
            setValue={onSetValue}
            name='recordSale'
            value={'0'}
            maxNum={onMaxNumWithKind()}
          />
        </KeyBox>
      </Main>
    </Section>
  )
}

export default RecordSalePopup;

const Section = styled.section`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
`
const Header = styled.div`
  position: relative;
  padding: 10px 10px 10px 20px;
  height: 30px;
  box-sizing: content-box;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  span {
    font-weight: 600;
    line-height: 30px;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  ${includes.flexBox()}
  ${buttonStyle.base()}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};

  &:hover,
  &:active {
    opacity: .6;
  }
`;

const Main = styled.div`
  position: relative;
  ${includes.flexBox('flex-start', 'stretch')}
  gap: 20px;
`;

const SaleBox = styled.div`
  padding: 20px 0 20px 20px;
`;

const SaleTotal = styled.div`
  ${includes.flexBox('center', 'space-between')}
  margin-bottom: 40px;
  font-size: 16px;
`;

const SalePay = styled.div`
  ${includes.flexBox('stretch', 'center')}
  gap: 10px;
  margin-bottom: 100px;
`;

const SaleInput = styled.input`
  ${inputStyle.base}
  background-color: ${({ theme }) => theme.inputColor};
  border-color: ${({ theme }) => `${theme.borderColor}` };
  color: ${({ theme }) => theme.textColor};
`;

const SalePayKind = styled.div`
  ${includes.flexBox()}
  gap: 5px;
`;

const KindButton = styled.button<{ kind: string }>`
  ${buttonStyle.primary()}
  background-color: ${({ kind }) => kind === 'true' ? colors.blue : colors.borderDark};
  width: 40px;
  height: 40px;
`;

const SaleResult = styled.div`
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const Wrapper = styled.div`
  ${includes.flexBox('center', 'space-between')}
  padding: 20px 0;

  strong {
    font-weight: 600;
    font-size: 20px;
  }
`;

const Confirm = styled.button`
  ${buttonStyle.primary()}
  width: 100%;
`;

const KeyBox = styled.div`
  position: relative;
  padding-bottom: 58.8%;
  width: 220px;
  background-color: ${({theme}) => theme.borderColor};
  font-size: 30px;
  

  & > div {
    top: 0;
  }

  span {
    font-size: 30px;
  }
`;
