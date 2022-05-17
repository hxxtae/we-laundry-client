import { Route, Switch } from 'react-router-dom';

import Records from '../pages/Main/Records/Records';
import History from '../pages/Main/History/History';
import Customer from '../pages/Main/Customer/Customer';
import Products from '../pages/Main/Products/Products';
import Address from '../pages/Main/Address/Address';
import Sales from '../pages/Main/Sales/Sales';
import OpenAndClose from '../pages/Main/OpenAndClose/OpenAndClose';
import { NotFoundPage } from '../components';

function UserContextRouter() {
  return (    
    <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"}>
          <OpenAndClose />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/records"}>
          <Records />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/history"}>
          <History />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/customer"}>
          <Customer />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/products"}>
          <Products />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/address"}>
          <Address />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/sales"}>
          <Sales />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
  );
}

export default UserContextRouter;
