import { Fragment, useState } from "react";

import { connect } from "react-redux";
import { addItem } from "../../actions/cartActions";
import { actFetchSingleProduct } from "../../actions/productActions";

import Cart from "../Cart/Cart";
import Rating from "react-rating";
import { BsStarFill, BsStar } from "react-icons/bs";
import {
  Carousel,
  Container,
  Row,
  Col,
  Card,
  Badge,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from "react-bootstrap";

const ProductDetail = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  if (!props.loadedProduct) {
    return <p className="centered">No products found!</p>;
  }

  const addToCartHandler = () => {
    props.addItem({
      id: props.loadedProduct.id,
      name: props.loadedProduct.name,
      amount: 1,
      price: props.loadedProduct.price,
    });
  };

  const loadedImages = [];
  for (let key in props.loadedProduct.images) {
    loadedImages.push(
      <Carousel.Item key={key}>
        <img
          style={{ maxHeight: "60vh" }}
          className="d-block w-100"
          src={props.loadedProduct.images[key].downloadUrl}
          alt=""
        />
      </Carousel.Item>
    );
  }
  return (
    <Fragment>
      {cartIsShown && (
        <Cart
          onClose={hideCartHandler}
          isBuyNow={true}
          loadedProduct={props.loadedProduct}
        />
      )}
      <Card style={{ margin: "2rem 15rem" }}>
        <Card.Header>Detail product</Card.Header>
        <Card.Body className="d-flex justify-content-between">
          <Col>
            <Carousel variant="dark">{loadedImages}</Carousel>
          </Col>
          <Col>
            <Card
              className="border-0"
              style={{ maxHeight: "60vh", minHeight: "60vh" }}
            >
              <Card.Body>
                <Badge bg="dark">{props.loadedProduct.category}</Badge>
                <Card.Title>{props.loadedProduct.name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  {props.loadedProduct.dimensions}
                </Card.Subtitle>
                <Container>
                  <Row>
                    <Col className="col-sm-3 ">
                      <Card.Title
                        as="h4"
                        className="md-3"
                        style={{ color: "#ad3502" }}
                      >
                        ${props.loadedProduct.price}
                      </Card.Title>
                    </Col>
                    <Col className="col-sm-9 ">
                      <Rating
                        style={{ color: "#f7dd7c" }}
                        initialRating={props.loadedProduct.rating}
                        stop={5}
                        fractions={2}
                        emptySymbol={[<BsStar />]}
                        fullSymbol={[<BsStarFill />]}
                        readonly
                      />
                    </Col>
                  </Row>
                </Container>
                <Card.Text>{props.loadedProduct.description}</Card.Text>

                <ButtonToolbar aria-label="Toolbar with button groups">
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="outline-dark" onClick={addToCartHandler}>
                      Add to Cart
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup className="me-2" aria-label="Second group">
                    <Button variant="outline-dark" onClick={showCartHandler}>
                      Buy Now
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Card.Body>
            </Card>
          </Col>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

const mapState = (state) => {
  return { loadedProduct: state.productReducer.loadedProduct };
};

const mapDispatch = {
  addItem,
  actFetchSingleProduct,
};

export default connect(mapState, mapDispatch)(ProductDetail);
