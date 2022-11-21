import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import { pathStr } from './path';

function NonUserRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={pathStr('login', true)}>
          <Login />
        </Route>
        <Route exact path={pathStr('signup', true)}>
          <Signup />
        </Route >
        <Route path={"*"}>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default NonUserRouter;
