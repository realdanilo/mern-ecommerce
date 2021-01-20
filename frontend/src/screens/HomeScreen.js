import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
// reducers/actions
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions.js";

const HomeScreen = ({match}) => {
  const keyword = match.params.keyword 

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="error">{error}</Message>}
      {!error && (
        <>
          <Row>
            {products.map((p, i) => (
              <Col key={i} sm="12" md="6" lg="4" xl="3">
                <Product product={p} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
