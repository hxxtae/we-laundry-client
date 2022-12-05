import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useRouteMatch } from 'react-router-dom';
import { pathStr } from '../routers/path';

interface IHeadComponent {
  titleName: string;
}

const HeadComponent = ({ titleName }: IHeadComponent) => {
  return (
    <Helmet>
      <title>{titleName}</title>
      <meta property="og:title" content={titleName}></meta>
    </Helmet>
  )
}

function PageRouterTitle() {
  const { path } = useRouteMatch();

  const onTitleBranchOfPath = useCallback(() => {
    if (pathStr('login') === path) return (<HeadComponent titleName={'welaundry: 로그인'} />);
    if (pathStr('signup') === path) return (<HeadComponent titleName={'welaundry: 회원가입'} />);
    if (pathStr('pos') === path) return (<HeadComponent titleName={'welaundry: POS'} />);
    if (pathStr('board') === path) return (<HeadComponent titleName={'welaundry: Board'} />);
    return (<HeadComponent titleName={'welaundry'} />);
  }, [path]);

  return (
    <>
      {onTitleBranchOfPath()}
    </>
  )
}

export default PageRouterTitle;
