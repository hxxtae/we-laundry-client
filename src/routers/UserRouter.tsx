import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Background, NotFoundPage } from '../components';
import BoardContext from '../pages/Board/BoardContext';
import LoginLoading from '../pages/Login/LoginLoading';
import { pathStr } from './path';

const PosContext = lazy(() => import("../pages/Pos/PosContext"));
const UserPosRouter = lazy(() => import("./UserPosRouter"));

function UserRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoginLoading />}>
        <Switch>
          <Route path={pathStr('pos', true)}>
            <PosContext>
              <UserPosRouter />
            </PosContext>
          </Route>
          <Route exact path={process.env.PUBLIC_URL + '/'}>
            <PosContext>
              <UserPosRouter />
            </PosContext>
          </Route>
          <Route path={pathStr('board', true)}>
            <BoardContext />
          </Route>
          <Route path={"*"}>
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
