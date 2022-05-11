import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainContext from '../pages/Main/MainContext';
import UserMenuRouter from './UserMenuRouter';

function UserRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={process.env.PUBLIC_URL + "/"}>
          <MainContext>
            <UserMenuRouter />
          </MainContext>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default UserRouter;
