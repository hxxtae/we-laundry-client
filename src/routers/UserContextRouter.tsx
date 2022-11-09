import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { LoadingItem, NotFoundPage } from '../components';

const Records = lazy(() => import("../pages/Main/Records/Records"));
const History = lazy(() => import("../pages/Main/History/History"));
const Customer = lazy(() => import("../pages/Main/Customer/Customer"));
const Products = lazy(() => import("../pages/Main/Products/Products"));
const Address = lazy(() => import("../pages/Main/Address/Address"));
const Sales = lazy(() => import("../pages/Main/Sales/Sales"));
const OpenAndClose = lazy(() => import("../pages/Main/OpenAndClose/OpenAndClose"));

function UserContextRouter() {
  return (
    <Suspense fallback={<LoadingItem />}>
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
    </Suspense>
  );
}

export default UserContextRouter;
