import * as S from './style';

interface IBackground {
  children: JSX.Element;
}

function Background({ children }: IBackground) {
  return (
    <S.Section>
      {children}
    </S.Section>
  )
}

export default Background;
