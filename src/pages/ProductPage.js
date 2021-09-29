import { Fragment } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import ProductList from "../components/Products/ProductList";
import ProductDetail from "../components/Products/ProductDetail";
const ProductPage = () => {
  let { path } = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <Route path={path} exact>
          <ProductList />
        </Route>
        <Route path={`${path}/detail/:productId`}>
          <ProductDetail />
        </Route>
        <Route path={`${path}/:categoryFilterParam`}>
          <ProductList />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default ProductPage;
