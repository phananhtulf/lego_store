import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { addItem } from "../../actions/cartActions";
import { actFetchSingleProduct } from "../../actions/productActions";

import classes from "./ProductItem.module.css";
import { Card, Col, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import Rating from "react-rating";
import { BsStarFill, BsStar } from "react-icons/bs";

const ProductItem = (props) => {
  const history = useHistory();

  const addToCartHandler = () => {
    props.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price,
    });
  };
  const loadDetail = () => {
    props.actFetchSingleProduct(props.id);
    history.replace(`/product/detail/${props.id}`);
  };
  return (
    <Col className="mb-3" key={props.id}>
      <Card>
        <Card.Img
          variant="top"
          src={props.images[Object.keys(props.images)[0]].downloadUrl}
        />
        <Card.Body>
          <Card.Text>
            <span className={classes.name}>{props.name}</span>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <cite>{props.dimensions}</cite>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <Card.Title as="h5" className="md-3" style={{ color: "#ad3502" }}>
              ${props.price}
            </Card.Title>
            <Rating
              style={{ color: "#f7dd7c" }}
              initialRating={props.rating}
              stop={5}
              fractions={2}
              emptySymbol={[<BsStar />]}
              fullSymbol={[<BsStarFill />]}
              readonly
            />
          </ListGroupItem>
        </ListGroup>

        <Card.Footer className="d-flex justify-content-between">
          <Button variant="outline-dark" size="sm" onClick={loadDetail}>
            View detail
          </Button>
          <Button variant="outline-dark" size="sm" onClick={addToCartHandler}>
            Add to cart
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

const mapState = (state) => {
  return {};
};

const mapDispatch = {
  addItem,
  actFetchSingleProduct,
};

export default connect(mapState, mapDispatch)(ProductItem);
