import { useEffect } from "react";
import { connect } from "react-redux";
import { actFetchAllProduct } from "../../actions/productActions";

import ProductItem from "../Products/ProductItem";
import { Container, Row, Nav, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Category = (props) => {
  //Load data
  useEffect(() => {
    props.actFetchAllProduct();
  }, []);

  let productByCategory = {};
  props.loadedProducts.forEach((product) => {
    if (productByCategory[product.category] === undefined) {
      productByCategory[product.category] = new Array(product);
    } else {
      productByCategory[product.category].push(product);
    }
  });

  const categorys = [];

  for (let key in productByCategory) {
    const child = productByCategory[key].map(
      (product, index) =>
        index < 5 && (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            dimensions={product.dimensions}
            price={product.price}
            images={product.images}
            rating={product.rating}
          />
        )
    );
    const item = (
      <Card style={{ margin: "2rem" }} key={key}>
        <Card.Header as="h5">
          <Nav>
            <Nav.Item>
              <LinkContainer to={`/product/${key}`}>
                <Nav.Link className="link-dark">
                  {key + " (" + productByCategory[key].length + ")"}
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row xs={5}>{child}</Row>
          </Container>
        </Card.Body>
      </Card>
    );
    categorys.push(item);
  }

  return <>{categorys}</>;
};

const mapState = (state) => {
  return {
    loadedProducts: state.productReducer.loadedProducts,
  };
};

const mapDispatch = {
  actFetchAllProduct,
};

export default connect(mapState, mapDispatch)(Category);
