import React, { useContext, useState } from "react";

import { connect } from "react-redux";
import { addItem, removeItem, clearCart } from "../../actions/cartActions";

import AuthContext from "../../store/auth-context";
import { checkout } from "../../api/api";
import { Modal, Col, ListGroup, Button } from "react-bootstrap";

const Cart = (props) => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [amountBuyOut, setAmountBuyOut] = useState(1);
  let cartData = props;
  const authCtx = useContext(AuthContext);

  if (props.isBuyNow) {
    cartData = {
      id: null,
      items: [
        {
          id: props.loadedProduct.id,
          name: props.loadedProduct.name,
          amount: amountBuyOut,
          price: props.loadedProduct.price,
        },
      ],
      totalAmount: props.loadedProduct.price * amountBuyOut,
      addItem: () => {
        setAmountBuyOut(amountBuyOut + 1);
      },
      removeItem: () => {
        if (amountBuyOut <= 1) {
          props.onClose();
        } else {
          setAmountBuyOut(amountBuyOut - 1);
        }
      },
    };
  }

  const totalAmount = `$${cartData.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartData.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartData.addItem(item);
  };

  const checkoutHandler = async () => {
    checkout(authCtx, cartData);
    setDidSubmit(true);
    if (!props.isBuyNow) {
      cartData.clearCart();
    }
  };

  const cartItems = cartData.items.map((item) => (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center"
      key={item.id}
    >
      <Col className="col-sm-8">
        <span
          className="d-inline-block text-truncate align-items-center"
          style={{ maxWidth: "90%" }}
        >
          {item.name}
        </span>
      </Col>
      <Col className="col-sm-2">{`$${item.price}`}</Col>
      <Col className="col-sm-1">{`x${item.amount}`}</Col>
      <Col className="col-sm-1">
        <Button
          className="btn-sm"
          variant="outline-dark"
          onClick={cartItemRemoveHandler.bind(null, item.id)}
        >
          -
        </Button>{" "}
        <Button
          className="btn-sm"
          variant="outline-dark"
          onClick={cartItemAddHandler.bind(null, item)}
        >
          +
        </Button>
      </Col>
    </ListGroup.Item>
  ));

  const cartModalContent = (
    <>
      <Modal.Body>
        <ListGroup>
          {cartItems}
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span className="fw-bold fs-4">Total</span>
            <span className="fw-bold fs-4">{totalAmount}</span>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onClose}>
          Cancel
        </Button>
        <Button
          variant="outline-dark"
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </Modal.Footer>
    </>
  );

  const alertDidSubmit = (
    <>
      <Modal.Body>Checkout Success</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onClose}>
          OK
        </Button>
      </Modal.Footer>
    </>
  );

  return (
    <Modal
      size="lg"
      show={true}
      onHide={props.onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title variant="success">My Cart</Modal.Title>
      </Modal.Header>
      {!didSubmit && cartModalContent}
      {didSubmit && alertDidSubmit}
    </Modal>
  );
};

const mapState = (state) => {
  return {
    id: state.cartReducer.id,
    items: state.cartReducer.items,
    totalAmount: state.cartReducer.totalAmount,
  };
};

const mapDispatch = {
  addItem,
  removeItem,
  clearCart,
};

export default connect(mapState, mapDispatch)(Cart);
