import React from 'react'
import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'


const HomeScreen = () => {
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
    )
}

export default HomeScreen
