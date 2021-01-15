import React,{useState, useEffect} from 'react'
import { Row, Col, ListGroup, Image, Card, Button} from "react-bootstrap"
import {useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from '../components/Loader'
import {Link} from "react-router-dom"
import {getOrderDetails, payOrder, deliverOrder} from "../actions/orderActions"
import axios from "axios"
import {PayPalButton} from "react-paypal-button-v2"


const OrderScreen = ({match}) => {
    const [sdk, setSdk] = useState(false)

    const orderId = match.params.id 
    const dispatch = useDispatch()
    const orderDetails= useSelector(st => st.orderDetails)
    const {loading, error, order} = orderDetails
    if(!loading){
        order.itemsPrice = order.orderItems.reduce((prev,cur)=> prev + cur.price * cur.qty , 0)
    }

    const orderPay = useSelector(st =>st.orderDetails)
    const {loading:loadingPay, success:successPay} = orderPay
    const { userInfo } = useSelector((st)=> st.user)
    const {loading:loadingDeliver,error:errorDeliver,success:successDeliver} = useSelector((st)=> st.orderDeliver)


   useEffect(()=>{
    const addPaypalScript = async() =>{
        const {data:clientId} = await axios.get("/api/config/paypal")
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = ()=>{
            setSdk(true)
        }
        document.body.appendChild(script)
    }
    if(!order || successPay || order._id !== orderId || successDeliver){
        dispatch({type:"ORDER_PAY_RESET"})
        dispatch({type:"ORDER_DELIVER_RESET"})
        dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
        if(!window.paypal){
            addPaypalScript()
        }else{
            setSdk(true)
        }
    }

   },[dispatch, order,orderId, successPay, successDeliver])

   const successPaymentHandler = (paymentResult)=>{
        dispatch(payOrder(orderId, paymentResult))
        // if(paymentResult || paymentResult.status =="COMPLETED"){
        //     window.location.reload()
        // }
   }

   const deliverHandler = ()=>{
       dispatch(deliverOrder(order))
   }
    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <>
        <h1>Order: {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p> <strong>Name: </strong>{order.user.name}</p>
                            <p> <strong>Email: </strong>
        
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                            <strong>Address: </strong> 
                            {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}   
                            </p>     
                            {order.isDeliver ? <Message variant="success">Deliver on {order.deliverAt}</Message>: <Message variant="danger">Not Deliver</Message>}                   
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method: </h2>
                            <p>

                            <strong>Method: </strong>
                            {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>: <Message variant="danger">Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
    {order.orderItems.length === 0 ? <Message>Order is empty</Message> : <ListGroup>
        {order.orderItems.map(item => (
        <ListGroup.Item key={item.product}>
            <Row>
                <Col md={1}>
                    <Image fluid rounded src={item.image} alt={item.name}/>
                </Col>

                <Col>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    
                </Col>

                <Col md={4}>
                    {item.qty} x {item.price} = ${item.qty * item.price}
                </Col>
            </Row>
        </ListGroup.Item>
    ))}
        </ListGroup>  }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                    Items
                                    </Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                    Shipping
                                    </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                    Tax
                                    </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                    Total
                                    </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdk ? <Loader/> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader/>}
                            {
                                userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )
                            }

                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default OrderScreen
