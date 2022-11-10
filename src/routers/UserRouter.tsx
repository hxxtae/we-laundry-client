import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginLoading from '../pages/Login/LoginLoading';

const MainContext = lazy(() => import("../pages/Main/MainContext"));
const UserContextRouter = lazy(() => import("./UserContextRouter"));

function UserRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoginLoading />}>
        <Switch>
          <Route path={process.env.PUBLIC_URL + "/"}>
            <MainContext>
              <UserContextRouter />
            </MainContext>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default UserRouter;
