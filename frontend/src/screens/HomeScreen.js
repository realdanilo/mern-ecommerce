import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import Paginate from "../components/Paginate.js";
import ProductCarousel from "../components/ProductCarousel.js";
// reducers/actions
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions.js";

const HomeScreen = ({match}) => {
  const {keyword, pageNumber =1 , } = match.params

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products,page,pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="error">{error}</Message>}
      {!keyword && <ProductCarousel/>}
      {!error && (
        <>
          <Row>
            {products.map((p, i) => (
              <Col key={i} sm="12" md="6" lg="4" xl="3">
                <Product product={p} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
        </>
      )}
    </>
  );
};

export default HomeScreen;
