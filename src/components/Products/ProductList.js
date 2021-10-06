import { useState } from "react";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";

import ProductItem from "./ProductItem";
import ReactPaginate from "react-paginate";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const ProductList = (props) => {
  const { categoryFilterParam } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(
    categoryFilterParam ? categoryFilterParam : "All"
  );
  const [productsPerPage] = useState(10);

  if (!props.loadedProducts || props.loadedProducts.length === 0) {
    return <p className="centered">No products found!</p>;
  }

  //get All Category before slice
  let categoryList = { All: "All" };
  props.loadedProducts.forEach((product) => {
    if (categoryList[product.category] === undefined) {
      categoryList[product.category] = product.category;
    }
  });
  console.log("searchValue:", searchValue);
  console.log("categoryFilter:", categoryFilter);
  // Filter products
  const filterProducts =
    categoryFilter === "All"
      ? props.loadedProducts.filter(
          (product) => product.name.toLowerCase().indexOf(searchValue) > -1
        )
      : props.loadedProducts.filter(
          (product) =>
            product.name.toLowerCase().indexOf(searchValue) > -1 &&
            product.category === categoryFilter
        );
  const pageCount = Math.ceil(filterProducts.length / productsPerPage);
  //slice data when paginate
  const currentProducts = filterProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Pagination
  const reactPaginateHandler = (data) => setCurrentPage(data.selected + 1);
  // Search by name
  const searchHandler = (e) => {
    e.preventDefault();
    const valueSearch =
      e.target[1] !== undefined ? e.target[1].value : e.target.value;
    setSearchValue(valueSearch.toLowerCase());
    setCurrentPage(1);
  };
  // Filter by Catergory
  const categoryFilterHandler = (eventKey, e) => {
    setCategoryFilter(eventKey);
    setCurrentPage(1);
  };

  let categoryFilterRender = [];
  for (let key in categoryList) {
    categoryFilterRender.push(
      <Dropdown.Item
        href="#"
        eventKey={key}
        key={key}
        active={key === categoryFilter}
      >
        {key}
      </Dropdown.Item>
    );
  }

  const productsList = currentProducts.map((product, index) => (
    <ProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      dimensions={product.dimensions}
      price={product.price}
      images={product.images}
      rating={product.rating}
    />
  ));

  return (
    <Card style={{ margin: "2rem" }}>
      <Card.Header>
        <Col className="col-md-6 offset-md-3">
          <Form onSubmit={(e) => searchHandler(e)}>
            <InputGroup className="mb-6">
              <DropdownButton
                variant="outline-secondary"
                title={categoryFilter}
                id="input-group-dropdown-1"
                onSelect={(eventKey, e) => categoryFilterHandler(eventKey, e)}
              >
                {categoryFilterRender}
              </DropdownButton>
              <FormControl
                className="col-xs-4"
                variant="outline-secondary"
                placeholder="Search..."
                aria-label="Search..."
                aria-describedby="basic-addon2"
                onKeyPress={(e) => {
                  e.key === "Enter" && searchHandler(e);
                }}
              />
              <Button
                id="button-addon2"
                type="submit"
                variant="outline-secondary"
                style={{ justifyContent: "center" }}
              >
                <BsSearch size="25" />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Card.Header>
      <Card.Body>
        <Container className="d-flex justify-content-center">
          {pageCount !== 0 && <Row xs={5}>{productsList}</Row>}
          {pageCount === 0 && (
            <Row>
              <span>No product found!</span>
            </Row>
          )}
        </Container>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
        {pageCount !== 0 && (
          <ReactPaginate
            containerClassName={"pagination mb-6"}
            previousLabel={"Previous"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            breakLabel={"..."}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            nextLabel={"Next"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            pageCount={pageCount}
            onPageChange={reactPaginateHandler}
          />
        )}
      </Card.Footer>
    </Card>
  );
};

const mapState = (state) => {
  return {
    loadedProducts: state.productReducer.loadedProducts,
  };
};

export default connect(mapState, null)(ProductList);
