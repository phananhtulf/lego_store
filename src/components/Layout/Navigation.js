import { useContext } from "react";

import { connect } from "react-redux";
import { clearCart } from "../../actions/cartActions";

import AuthContext from "../../store/auth-context";
import { upsertTempCart } from "../../api/api";

import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOut, IoStorefrontOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from "react-bootstrap";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const numberOfCartItems =
    props.items === undefined
      ? 0
      : props.items.reduce((curNumber, item) => {
          return curNumber + item.amount;
        }, 0);

  const logoutHandler = () => {
    //Save tempCart to reload next time login
    upsertTempCart(props);
    props.clearCart();
    authCtx.logout();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <IoStorefrontOutline size="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={isLoggedIn ? "/category" : "/"}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {isLoggedIn && (
              <LinkContainer to="/product">
                <Nav.Link>All Products</Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          {isLoggedIn && (
            <Nav>
              <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                  <Button
                    variant="outline-light"
                    style={{ justifyContent: "center" }}
                    onClick={() => props.onShowCart(false)}
                  >
                    <FaShoppingCart size="20" />{" "}
                    <Badge pill bg="secondary">
                      {numberOfCartItems}
                    </Badge>
                  </Button>
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Second group">
                  <Button
                    variant="outline-light"
                    style={{ justifyContent: "center" }}
                    onClick={() => logoutHandler()}
                  >
                    <IoLogOut size="25" />
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Nav>
          )}
          {!isLoggedIn && (
            <Nav>
              <Nav>
                <LinkContainer to="/auth">
                  <Nav.Link variant="outline-light" className="active">
                    <CgProfile size="25" />
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
  clearCart,
};

export default connect(mapState, mapDispatch)(Navigation);
