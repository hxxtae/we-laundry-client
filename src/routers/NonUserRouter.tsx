import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PageRouterTitle } from '../components';

import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import { pathStr } from './path';
import { loginImg } from '../pages/Login/LoginContext';

// --- NOTE: Login Image Preload
const img = new Image();
loginImg.forEach((obj) => img.src = obj.path);

function NonUserRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={pathStr('login', true)}>
          <PageRouterTitle />
          <Login />
        </Route>
        <Route exact path={pathStr('signup', true)}>
          <PageRouterTitle />
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
