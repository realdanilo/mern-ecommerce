import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts , deleteProductById, createProduct} from '../actions/productActions'

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const { loading, error, products }  = useSelector((state) => state.productList)
  //check if user is logged-in, to make sure token (to delete middleware) 
  const { userInfo } = useSelector((st)=> st.user)
  
  const { success:successDelete, error:errorDelete, loading:loadingDelete} = useSelector((st)=> st.productDelete)
  const { loading:loadingCreate, error:errorCreate, product:createdProduct, success:successCreate }  = useSelector((state) => state.productCreate)

    useEffect(()=>{
      dispatch({type:"PRODUCT_CREATE_RESET"})

      if(!userInfo || !userInfo.isAdmin){
        history.push("/login")
      }

      if(successCreate && createdProduct){
        history.push(`/admin/product/${createdProduct._id}/edit`)
      }else{
        dispatch(listProducts())
      }
        
    },[dispatch, history,  userInfo,successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
     if(window.confirm("Are you sure?")){
           dispatch(deleteProductById(id))
     }
     
    }

    const createProductHandler = ()=>{
      dispatch(createProduct())
    }
    
  return (
    <>
    <Row className="align-itmes-center">
        <Col>
           <h1>Products</h1>
        </Col>
        <Col className="text-right">
            <Button className="text-right" onClick={createProductHandler}>
                Create Product <i className="fas fa-plus"/>
            </Button>
        </Col>
    </Row>
    {loadingDelete && <Loader/>}
    {loadingCreate && <Loader/>}
    {errorDelete && <Message variant="danger">{errorDelete}</Message>}
    {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                 $ {product.price}
                </td>
                <td>
                 {product.category}
                </td>
                <td>
                    {product.brand}
                </td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={()=> deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen