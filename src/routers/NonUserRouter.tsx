import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

function NonUserRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"}>
          <Login />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/signup"}>
          <Signup />
        </Route >
        <Route exact path="*">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default NonUserRouter;
