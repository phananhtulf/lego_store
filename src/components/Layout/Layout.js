import { Fragment, useState } from "react";

import { connect } from "react-redux";

import Navigation from "./Navigation";
import Cart from "../Cart/Cart";

import { Spinner } from "react-bootstrap";

const Layout = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} isBuyNow={false} />}
      <Navigation onShowCart={showCartHandler} />
      <main>
        {props.isLoading && (
          <div className="centered">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading... </span>
            </Spinner>
          </div>
        )}
        <div
          style={props.isLoading ? { display: "none" } : { display: "block" }}
        >
          {props.children}
        </div>
      </main>
    </Fragment>
  );
};
const mapState = (state) => {
  return { isLoading: state.loadingReducer.isLoading };
};

export default connect(mapState, null)(Layout);
