import { AnimatePresence } from 'framer-motion';

import * as S from './style';

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
      <S.Wrapper>
        <S.DateValue onClick={onClickSelect}>{kindValue(selectKind)}</S.DateValue>
        {
          selectKindAct &&
          <S.DateSelect variants={S.selectVariant} initial="init" animate="start" exit="end">
            {kinds.map((kind) => (
              <S.DateOption
                key={kind.kind}
                chk={kind.kind === selectKind ? 'true' : 'false'}
                onClick={() => onChangeSelect(kind.kind)}
              >
                {kind.value}
              </S.DateOption>
            ))}
          </S.DateSelect>
        }
      </S.Wrapper>
    </AnimatePresence>
  )
}

export default DateKind;

