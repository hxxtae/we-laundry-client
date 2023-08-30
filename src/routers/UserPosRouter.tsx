import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { LoadingItem, NotFoundPage } from '../components';
import { pathStr } from './path';

const Records = lazy(() => import("../pages/Pos/Records/Records"));
const History = lazy(() => import("../pages/Pos/History/History"));
const Customer = lazy(() => import("../pages/Pos/Customer/Customer"));
const Products = lazy(() => import("../pages/Pos/Products/Products"));
const Address = lazy(() => import("../pages/Pos/Address/Address"));
const Sales = lazy(() => import("../pages/Pos/Sales/Sales"));
const OpenAndClose = lazy(() => import("../pages/Pos/OpenAndClose/OpenAndClose"));

function UserPosRouter() {
  return (
    <Suspense fallback={<LoadingItem size='2x'/>}>
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
