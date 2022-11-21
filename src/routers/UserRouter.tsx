import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFoundPage } from '../components';
import BoardContext from '../pages/Board/BoardContext';
import LoginLoading from '../pages/Login/LoginLoading';
import { pathStr } from './path';

const MainContext = lazy(() => import("../pages/Main/MainContext"));
const UserPosRouter = lazy(() => import("./UserPosRouter"));

function UserRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoginLoading />}>
        <Switch>
          <Route path={pathStr('pos', true)}>
            <MainContext>
              <UserPosRouter />
            </MainContext>
          </Route>
          <Route exact path={process.env.PUBLIC_URL + '/'}>
            <MainContext>
              <UserPosRouter />
            </MainContext>
          </Route>
          <Route path={pathStr('board', true)}>
            <BoardContext />
          </Route>
          <Route path={"*"}>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default UserRouter;
