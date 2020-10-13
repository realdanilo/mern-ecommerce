import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
//components
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";



const ProductScreen = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const addToCartHandler = () => {
    //go to cart page
    //pas product id, and qty
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="error">{error}</Message>}
      {!error && (
        <>
          <Link to="/" className="btn btn-light py-3">
            Go Back
          </Link>
          <Row>
            <Col md="6">
              <Image fluid src={product.image} atl={product.name} />
            </Col>
            <Col md="3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <p>
                          {" "}
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}
                  <ListGroup.Item>
                    <Button
                      type="button"
                      disable={product.countInStock === 0 }
                      className="btn-block"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>{" "}
        </>
      )}
    </>
  );
};

export default ProductScreen;
