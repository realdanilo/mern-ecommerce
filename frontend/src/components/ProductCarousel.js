import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {Carousel, Image} from "react-bootstrap"
import Loader from "./Loader"
import Message from "./Message"
import {getTopProducts} from "../actions/productActions"

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const {loading, error, products} = useSelector((st)=> st.getTopProducts)
    
    useEffect(()=>{
        dispatch(getTopProducts())
    },[dispatch])
    return (
        <div>
            {loading && <Loader/>}
            {error && <Message variant="danger">{error}</Message>}
            {!error && (
                <Carousel pause="hover" className="bg-dark">
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid={true}/>
                                <Carousel.Caption className="carousel-caption">
                                    <h2>{product.name} ${product.price}</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
            
        </div>
    )
}

export default ProductCarousel
