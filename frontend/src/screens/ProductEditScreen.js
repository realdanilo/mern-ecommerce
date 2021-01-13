import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button,} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message.js"
import Loader from "../components/Loader.js"
import {listProductDetails,updateProduct } from "../actions/productActions.js"
import FormContainer from "../components/FormContainer.js"

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id 
    const [name,setName]= useState("")
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState("")
    const [brand,setBrand] = useState("")
    const [category,setCategory] = useState("")
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState("")

    const dispatch  = useDispatch()
    const {loading, error, product} = useSelector(st=> st.productDetails)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = useSelector((st)=> st.productUpdate)

    useEffect( ()=>{
        if(successUpdate){
            dispatch({type:"PRODUCT_UPTATE_RESET"})
            history.push("/admin/productlist")
        }else{
            if(!product || !product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
               setName(product.name)
               setPrice(product.price)
               setImage(product.image)
               setBrand(product.brand)
               setCategory(product.category)
               setCountInStock(product.countInStock)
               setDescription(product.description)
            }
        }
     
    },[product,productId, dispatch, history, successUpdate])

    const submitHandler =(e)=>{
        e.preventDefault()
      //update product
      dispatch(updateProduct({
          _id:productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock
      }))
       
    }

    return (
        <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h2>Edit Product</h2>
            {error && <Message variant="danger">{error}</Message>}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading && <Loader/>}
            {loadingUpdate && <Loader/>}
            {product && (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name"  value={name} required={true} onChange={(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter Price"  value={price} required={true} onChange={(e)=> setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" placeholder="Enter Image"  value={image} required={true} onChange={(e)=> setImage(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" placeholder="Enter Brand"  value={brand} required={true} onChange={(e)=> setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type="number" placeholder="Enter Count In Stock"  value={countInStock} required={true} onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter Category"  value={category} required={true} onChange={(e)=> setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description"  value={description} required={true} onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
   
                   
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            )}
           
           
        </FormContainer>
        </>
    )
}

export default ProductEditScreen
