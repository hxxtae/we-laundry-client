import * as S from './style';

function LoadingLogo() {
  return (
    <S.Box>
      <S.Logo src={process.env.PUBLIC_URL + '/assets/svg/welaundry_medium_v2_darkblue.svg'} alt='Welaundry logo'></S.Logo>
      <S.Message>잠시만 기다려주세요</S.Message>
    </S.Box>
  )
}

export default LoadingLogo;
