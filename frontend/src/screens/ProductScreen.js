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
import { listProductDetails , createProductReview} from "../actions/productActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";



const ProductScreen = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  //***  product review state*/
  const [rating, setRating]= useState(0)
  const [comment, setComment]= useState("")
  const { loading:loadingReview, error:errorReview, success:successReview} = useSelector((st)=> st.productReview)
  const userInfo = useSelector((st)=> st.user)

  useEffect(() => {
    if(successReview){
      alert("Review Submitted")
      setRating(0)
      setComment("")
      dispatch({type:"PRODUCT_REVIEW_RESET"})
    }
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch, successReview]);

  const addToCartHandler = () => {
    //go to cart page
    //pas product id, and qty
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };
  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(createProductReview(match.params.id,{
      rating,comment
    }))

  }

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
                      disable={product.countInStock === 0 ? "true" : "false" }
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {loadingReview && <Loader/>}
              {product.reviews.length ===0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review)=>(
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}/>
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <ListGroup>
                <h2>Write a customer review</h2>
                {errorReview && <Message variant="danger">{errorReview}</Message>}
                {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as="select" value={rating} onChange={(e)=>setRating(e.target.value)}>
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control as="textarea" row="3" value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary">Submit</Button>
                </Form>
                ): <Message>Please <Link to="/login">Sign in</Link></Message>}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
