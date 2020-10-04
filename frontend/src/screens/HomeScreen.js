import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    loadData();
  }, []);
  return (
    <>
      <h1>Lates Product</h1>
      <Row>
        {products.map((p, i) => (
          <Col key={i} sm="12" md="6" lg="4" xl="3">
            <Product product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
