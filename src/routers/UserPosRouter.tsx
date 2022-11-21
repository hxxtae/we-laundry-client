import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { LoadingItem, NotFoundPage } from '../components';
import { pathStr } from './path';

const Records = lazy(() => import("../pages/Main/Records/Records"));
const History = lazy(() => import("../pages/Main/History/History"));
const Customer = lazy(() => import("../pages/Main/Customer/Customer"));
const Products = lazy(() => import("../pages/Main/Products/Products"));
const Address = lazy(() => import("../pages/Main/Address/Address"));
const Sales = lazy(() => import("../pages/Main/Sales/Sales"));
const OpenAndClose = lazy(() => import("../pages/Main/OpenAndClose/OpenAndClose"));

function UserPosRouter() {
  return (
    <Suspense fallback={<LoadingItem />}>
      <Switch>
        <Route exact path={[pathStr('pos', true), process.env.PUBLIC_URL + '/']}>
          <OpenAndClose />
        </Route>
        <Route exact path={pathStr('records', true)}>
          <Records />
        </Route>
        <Route exact path={pathStr('history', true)}>
          <History />
        </Route>
        <Route exact path={pathStr('customer', true)}>
          <Customer />
        </Route>
        <Route exact path={pathStr('products', true)}>
          <Products />
        </Route>
        <Route exact path={pathStr('address', true)}>
          <Address />
        </Route>
        <Route exact path={pathStr('sales', true)}>
          <Sales />
        </Route>
        <Route path={"*"}>
          <NotFoundPage />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default UserPosRouter;
