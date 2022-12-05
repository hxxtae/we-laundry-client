import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Background, NotFoundPage, PageRouterTitle } from '../components';
import { pathStr } from './path';
import LoginLoading from '../pages/Login/LoginLoading';

const PosContext = lazy(() => import("../pages/Pos/PosContext"));
const BoardContext = lazy(() => import("../pages/Board/BoardContext"));
const UserPosRouter = lazy(() => import("./UserPosRouter"));

function UserRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoginLoading />}>
        <Switch>
          <Route path={pathStr('pos', true)}>
            <PageRouterTitle />
            <PosContext>
              <UserPosRouter />
            </PosContext>
          </Route>
          <Route exact path={process.env.PUBLIC_URL + '/'}>
            <PageRouterTitle />
            <PosContext>
              <UserPosRouter />
            </PosContext>
          </Route>
          <Route path={pathStr('board', true)}>
            <PageRouterTitle />
            <BoardContext />
          </Route>
          <Route path={"*"}>
            <PageRouterTitle />
            <Background>
              <NotFoundPage />
            </Background>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default UserRouter;
