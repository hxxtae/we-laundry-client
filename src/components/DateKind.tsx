import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import { includes, inputStyle, scroll, selectStyle } from '../styles';

interface IKind {
  kind: string;
  value: string;
}

interface IDateKind {
  selectKindAct: boolean;
  selectKind: string;
  onChangeSelect: (kind: string) => void;
  onClickSelect: () => void;
}

const kinds: IKind[] = [
  { kind: '0d', value: '하루' },
  { kind: '1d', value: '이틀' },
  { kind: '7d', value: '일주일' },
  { kind: '1m', value: '한 달' }
];

function DateKind({ selectKindAct, selectKind, onChangeSelect, onClickSelect }: IDateKind) {
  const kindValue = (kind: string) => {
    return kinds.find((obj) => obj.kind === kind)?.value;
  }

  return (
    <AnimatePresence>
      <Wrapper>
        <DateValue onClick={onClickSelect}>{kindValue(selectKind)}</DateValue>
        {
          selectKindAct &&
          <DateSelect variants={selectVariant} initial="init" animate="start" exit="end">
            {kinds.map((kind) => (
              <DateOption
                key={kind.kind}
                chk={kind.kind === selectKind ? 'true' : 'false'}
                onClick={() => onChangeSelect(kind.kind)}
              >
                {kind.value}
              </DateOption>
            ))}
          </DateSelect>
        }
      </Wrapper>
    </AnimatePresence>
  )
}

export default DateKind;

// NOTE: motion effect object
const selectVariant = {
  init: {
    height: 0,
  },
  start: {
    height: "auto",
    transition: {
      type: 'tween',
    }
  },
  end: {
    height: 0,
    opacity: 0,
    border: 0,
  }
}

const Wrapper = styled.div`
  position: relative;
`;

const DateValue = styled.strong`
  ${inputStyle.base()}
  ${includes.flexBox()}
  padding: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.inputColor};
  border-color: ${({ theme }) => theme.borderColor };
  min-width: 80px;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;

const DateSelect = styled(motion.ul)`
  ${selectStyle.select(40)}
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  ${({ theme }) => scroll.custom(8, theme.borderColorSub, theme.textColor)}
`;

const DateOption = styled(motion.li)<{ chk: string }>`
  ${selectStyle.option()}
  background-color: ${({ theme, chk }) => chk === 'true' ? theme.borderColor : 'transparent' };
  color: ${({ theme }) => theme.textColor};
  &:hover {
    background-color: ${({ theme }) => theme.borderColor};
  }
`;