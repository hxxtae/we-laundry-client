import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainContext from '../pages/Main/MainContext';
import UserContextRouter from './UserContextRouter';

function UserRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={process.env.PUBLIC_URL + "/"}>
          <MainContext>
            <UserContextRouter />
          </MainContext>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default UserRouter;
